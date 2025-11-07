<script setup lang="ts">

import {ref} from "vue";
import DMTable from "./DMTable.vue";
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
import {AgeOfAshes, MonsterCore} from "./db.ts";

const { t } = useTranslations()

const emit = defineEmits<{
  (e: 'nextTurn'): void
  (e: 'reset'): void
  (e: 'newCombatant', name: string, HP: number, initiative: number, visibility: Visibility): void
  (e: 'removeCombatant', index: number): void
}>()

defineProps<{
  turn: number,
  round: number,
  combatants: Combatant[],
}>()

const newName = ref('')
const newHP = ref(1)
const newInitiative = ref(1)
const newVisibility = ref(Visibility.None)
const newQuantity = ref(1)
const isNewCombatantPopoverOpen = ref(false)

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

function getCombatantName(i: number): string {
  if (i == 0 && newQuantity.value == 1) {
    return newName.value
  }
  // Uses default pathfinder pawn colors then numbers for multiple of the same enemy
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

const monsterCore = new MonsterCore()
const ageOfAshes = new AgeOfAshes()

let monsterList = [...monsterCore.monsters, ...monsterCore.npc, ...ageOfAshes.monsters].sort()
</script>

<template>
  <div>
    <article class="prose ml-8">
      <h3>{{t.table.round}} {{round}}</h3>
    </article>
    <DMTable :combatants="combatants" :turn="turn" @removeCombatant="removeCombatant" class="shadow-md/50" />
    <div class="grid grid-cols-1 gap-4">
      <div class="flex gap-4">
        <button class="btn btn-neutral" @click="$emit('nextTurn')"><Icon icon="tabler:player-skip-forward" height="24" />{{t.dm_actions.next}}</button>
        <button class="btn btn-error tooltip tooltip-bottom before:delay-200" :data-tip="t.dm_actions.resetTooltip" @click="$emit('reset')"><Icon icon="tabler:refresh" height="24" />{{t.dm_actions.reset}}</button>
        <a class="btn btn-neutral" href="?view=player"><Icon icon="tabler:users-group" height="24" />{{t.dm_actions.playerView}}</a>
      </div>
      <div class="flex gap-4">
        <PopoverRoot :open="isNewCombatantPopoverOpen" @update:open="value => isNewCombatantPopoverOpen = value">
          <PopoverTrigger as-child>
            <button class="btn btn-neutral"><Icon icon="tabler:plus" height="24" /> {{t.dm_actions.add}}</button>
          </PopoverTrigger>
          <PopoverPortal>
            <PopoverContent class="card w-96 bg-base-300 card-md shadow-l">
              <div class="card-body" @keydown.enter.prevent="addCombatant">
                <div class="grid grid-cols-3 items-center gap-4">
                  <Label for="newName">{{t.table.name}}</Label>
                  <input id="newName" tabindex="1" type="text" class="input col-span-2 h-8" list="monsters" v-model="newName" />
                  <datalist id="monsters">
                    <option v-for="monster in monsterList">{{monster}}</option>
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
</template>

<style scoped>

</style>
