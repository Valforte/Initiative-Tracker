<script setup lang="ts">

import {ref} from "vue";
import DMTable from "./DMTable.vue";
import Settings from "./Settings.vue";
import {Combatant, Visibility} from "./functions.ts";
import {Icon} from "@iconify/vue";
import {useTranslations} from "./lang.ts";
import {
  Label,
  NumberFieldInput,
  NumberFieldRoot,
  PopoverArrow,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger
} from "reka-ui";
import {getEnabledMonsters, getDefaultEnabledSources, type Monster, type GameSystem} from "./db.ts";
import {useStorage} from "@vueuse/core";
import {computed, watch} from "vue";

const { t } = useTranslations()

const emit = defineEmits<{
  (e: 'nextTurn'): void
  (e: 'reset'): void
  (e: 'resetToDefaults'): void
  (e: 'newCombatant', name: string, HP: number, initiative: number, visibility: Visibility): void
  (e: 'removeCombatant', index: number): void
  (e: 'toggleOnlineMode', value: boolean): void
}>()

const props = defineProps<{
  turn: number,
  round: number,
  combatants: Combatant[],
  isOnlineMode: boolean,
  sessionId: string,
}>()

const showCopiedMessage = ref(false)
const showResetConfirm = ref(false)
const isSettingsOpen = ref(false)

const newName = ref('')
const newHP = ref(1)
const newInitiative = ref(1)
const newVisibility = ref(Visibility.None)
const newQuantity = ref(1)
const isNewCombatantPopoverOpen = ref(false)

// Get enabled content sources and generate monster list
const gameSystem = useStorage<GameSystem>('gameSystem', 'pathfinder')
const enabledContentSources = useStorage<string[]>('enabledContentSources', getDefaultEnabledSources(gameSystem.value))
const monsterList = computed<Monster[]>(() => getEnabledMonsters(enabledContentSources.value))

// Watch for monster selection and auto-fill HP if available
watch(newName, (selectedName) => {
  const monster = monsterList.value.find(m => m.name === selectedName)
  if (monster && monster.hp > 1) {
    newHP.value = monster.hp
  }
})

function changeNewVisibility(): void {
  newVisibility.value++
  if (newVisibility.value > 2) newVisibility.value = 0
}

function clearNewCombatant(): void {
  newName.value = ''
  newHP.value = 1
  newInitiative.value = 1
  newVisibility.value = Visibility.None
  newQuantity.value = 1
  document.getElementById('newName')?.focus()
}

/**
 * Generates a unique name for multiple combatants spawned at once
 * Uses Pathfinder pawn colors (Red, Green, Blue, Purple, Pink, Brown) for the first 6,
 * then falls back to numbers for additional spawns
 * @param i - Index of the combatant being spawned (0-based)
 * @returns The combatant name with color/number suffix, or plain name if quantity is 1
 */
function getCombatantName(i: number): string {
  if (i == 0 && newQuantity.value == 1) {
    return newName.value
  }
  switch (i) {
    case 0:
      return `${newName.value} (${t.value.colors.red})`
    case 1:
      return `${newName.value} (${t.value.colors.green})`
    case 2:
      return `${newName.value} (${t.value.colors.blue})`
    case 3:
      return `${newName.value} (${t.value.colors.purple})`
    case 4:
      return `${newName.value} (${t.value.colors.pink})`
    case 5:
      return `${newName.value} (${t.value.colors.brown})`
    default:
      return `${newName.value} (${i})`
  }
}

function addCombatant(): void {
  for (let i = 0; i < newQuantity.value; i++) {
    emit('newCombatant', getCombatantName(i), newHP.value, newInitiative.value, newVisibility.value)
  }
  isNewCombatantPopoverOpen.value = false
  setTimeout(clearNewCombatant, 1)
}

function removeCombatant(index: number): void {
  emit('removeCombatant', index)
}

/**
 * Reset confirmation dialog handlers
 */
function requestReset() {
  showResetConfirm.value = true
}

function cancelReset() {
  showResetConfirm.value = false
}

function confirmReset() {
  showResetConfirm.value = false
  emit('resetToDefaults')
}

/**
 * Copy player view URL to clipboard
 * Constructs URL with session ID and view=player parameter
 */
async function copyPlayerUrl(): Promise<void> {
  if (!props.sessionId) return

  const url = new URL(window.location.href)
  url.searchParams.set('session', props.sessionId)
  url.searchParams.set('view', 'player')

  try {
    await navigator.clipboard.writeText(url.toString())
    showCopiedMessage.value = true
    setTimeout(() => {
      showCopiedMessage.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy URL:', err)
  }
}
</script>

<template>
  <div>
    <div>
      <article class="prose ml-8">
        <h3>{{t.table.round}} {{round}}</h3>
      </article>
      <DMTable :combatants="combatants" :turn="turn" @removeCombatant="removeCombatant" class="shadow-md/50" />
      <div class="grid grid-cols-1 gap-4">
      <div class="flex gap-4">
        <button class="btn btn-neutral" @click="$emit('nextTurn')" :aria-label="t.dm_actions.next"><Icon icon="tabler:player-skip-forward" height="24" />{{t.dm_actions.next}}</button>
        <button class="btn btn-error tooltip tooltip-bottom before:delay-200" :data-tip="t.dm_actions.resetTooltip" @click="$emit('reset')" :aria-label="t.dm_actions.reset"><Icon icon="tabler:refresh" height="24" />{{t.dm_actions.reset}}</button>
        <a v-if="!isOnlineMode" class="btn btn-neutral" href="?view=player" :aria-label="t.dm_actions.playerView"><Icon icon="tabler:users-group" height="24" />{{t.dm_actions.playerView}}</a>
        <button
          v-else
          class="btn btn-neutral relative"
          @click="copyPlayerUrl"
          :aria-label="t.dm_actions.copyPlayerUrl"
        >
          <Icon icon="tabler:users-group" height="24" />
          {{t.dm_actions.copyPlayerUrl}}
          <div v-if="showCopiedMessage" class="absolute -top-12 left-1/2 -translate-x-1/2 badge badge-success">
            {{t.dm_actions.copiedToClipboard}}
          </div>
        </button>
      </div>
      <div class="flex gap-4">
        <button
          class="btn btn-neutral"
          :aria-label="t.options.settings"
          @click="isSettingsOpen = true"
        >
          <Icon icon="tabler:settings" height="24" />
          {{t.options.settings}}
        </button>
      </div>
      <div class="flex gap-4">
        <PopoverRoot :open="isNewCombatantPopoverOpen" @update:open="value => isNewCombatantPopoverOpen = value">
          <PopoverTrigger as-child>
            <button class="btn btn-neutral" :aria-label="t.dm_actions.add"><Icon icon="tabler:plus" height="24" /> {{t.dm_actions.add}}</button>
          </PopoverTrigger>
          <PopoverPortal>
            <PopoverContent class="card w-96 bg-base-300 card-md shadow-l" role="dialog" aria-label="Add new combatant">
              <div class="card-body" @keydown.enter.prevent="addCombatant">
                <div class="grid grid-cols-3 items-center gap-4">
                  <Label for="newName">{{t.table.name}}</Label>
                  <input id="newName" tabindex="1" type="text" class="input col-span-2 h-8" list="monsters" v-model="newName" aria-label="Combatant name" />
                  <datalist id="monsters">
                    <option v-for="monster in monsterList" :key="monster.name">{{monster.name}}</option>
                  </datalist>
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <Label for="newHP">{{t.table.hp}}</Label>
                  <NumberFieldRoot :min="1" v-model="newHP" class="col-span-2">
                    <NumberFieldInput tabindex="2" id="newHP" class="input h-8" />
                  </NumberFieldRoot>
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <Label for="newInitiative">{{t.table.initiative}}</Label>
                  <NumberFieldRoot :min="1" v-model="newInitiative" class="col-span-2">
                    <NumberFieldInput tabindex="3" id="newInitiative" class="input h-8" />
                  </NumberFieldRoot>
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <Label for="newInitiative">{{t.dm_actions.quantity}}</Label>
                  <NumberFieldRoot :min="1" v-model="newQuantity" class="col-span-2">
                    <NumberFieldInput tabindex="3" id="newQuantity" class="input h-8" />
                  </NumberFieldRoot>
                </div>
                <div class="flex justify-end gap-2">
                  <button @click="changeNewVisibility" tabindex="4" class="btn btn-neutral btn-sm">
                    <Icon v-if="newVisibility === Visibility.Full" icon="tabler:eye" height="24" />
                    <Icon v-else-if="newVisibility === Visibility.Half" icon="tabler:eye-off" height="24" />
                    <Icon v-else-if="newVisibility === Visibility.None" icon="tabler:eye-closed" height="24" />
                  </button>
                  <button @click="clearNewCombatant" tabindex="5" class="btn btn-error btn-sm"><Icon icon="tabler:eraser" height="24" />{{t.dm_actions.clear}}</button>
                  <button @click="addCombatant" tabindex="6" class="btn btn-neutral btn-sm"><Icon icon="tabler:plus" height="24" />{{t.dm_actions.add}}</button>
                </div>
              </div>
              <PopoverArrow class="fill-base-300" />
            </PopoverContent>
          </PopoverPortal>
        </PopoverRoot>
      </div>
    </div>
    </div>

    <!-- Reset Confirmation Dialog -->
  <div v-if="showResetConfirm" class="fixed inset-0 z-[9999] flex items-center justify-center">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/50" @click="cancelReset"></div>

    <!-- Dialog -->
    <div class="card bg-base-100 w-96 shadow-xl relative z-10">
      <div class="card-body">
        <h3 class="card-title text-error">
          <Icon icon="tabler:alert-triangle" height="24" />
          {{t.options.resetConfirmTitle}}
        </h3>
        <p>{{t.options.resetConfirmMessage}}</p>
        <div class="card-actions justify-end mt-4">
          <button class="btn btn-ghost" @click="cancelReset">
            {{t.options.resetConfirmNo}}
          </button>
          <button class="btn btn-error" @click="confirmReset">
            <Icon icon="tabler:refresh" height="20" />
            {{t.options.resetConfirmYes}}
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Settings Modal -->
  <Settings
    :isOnlineMode="isOnlineMode"
    :sessionId="sessionId"
    :isDMView="true"
    :isOpen="isSettingsOpen"
    @toggleOnlineMode="(value) => $emit('toggleOnlineMode', value)"
    @requestReset="requestReset"
    @close="isSettingsOpen = false"
  />
  </div>
</template>

<style scoped>

</style>
