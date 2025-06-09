<script setup lang="ts">

import {ref} from "vue";
import DMTable from "./DMTable.vue";
import {Combatant, Visibility} from "./functions.ts";
import {Icon} from "@iconify/vue";
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

const emit = defineEmits<{
  (e: 'nextTurn'): void
  (e: 'reset'): void
  (e: 'setPlayerView'): void
  (e: 'newCombatant', name: string, HP: number, initiative: number, visibility: Visibility): void
}>()

defineProps<{
  turn: Number,
  round: Number,
  combatants: Array<Combatant>,
}>()

const newName = ref('')
const newHP = ref(1)
const newInitiative = ref(1)
const newVisibility = ref(Visibility.None)
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
  document.getElementById('newName')?.focus()
}

function addCombatant(): void {
  emit('newCombatant', newName.value, newHP.value, newInitiative.value, newVisibility.value)
  isNewCombatantPopoverOpen.value = false
  setTimeout(clearNewCombatant, 1)
}
</script>

<template>
  <div>
    <article class="prose ml-8">
      <h3>Rodada {{round}}</h3>
    </article>
    <DMTable :combatants="combatants" :turn="turn" class="shadow-md/50" />
    <div class="grid grid-cols-1 gap-4">
      <div class="flex gap-4">
        <button class="btn btn-neutral" @click="$emit('nextTurn')"><Icon icon="tabler:player-skip-forward" height="24" />Avançar</button>
        <button class="btn btn-error" @click="$emit('reset')"><Icon icon="tabler:refresh" height="24" />Resetar</button>
        <button class="btn btn-neutral" @click="$emit('setPlayerView')"><Icon icon="tabler:users-group" height="24" />Player View</button>
      </div>
      <div class="flex gap-4">
        <PopoverRoot :open="isNewCombatantPopoverOpen" @update:open="value => isNewCombatantPopoverOpen = value">
          <PopoverTrigger as-child>
            <button class="btn btn-neutral"><Icon icon="tabler:plus" height="24" /> Adicionar</button>
          </PopoverTrigger>
          <PopoverPortal>
            <PopoverContent class="card w-96 bg-base-300 card-md shadow-l">
              <div class="card-body" @keydown.enter.prevent="addCombatant">
                <div class="grid grid-cols-3 items-center gap-4">
                  <Label for="newName">Nome</Label>
                  <input id="newName" tabindex="1" v-model="newName" class="input col-span-2 h-8" />
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <Label for="newHP">HP</Label>
                  <NumberFieldRoot :min="1" v-model="newHP" class="col-span-2">
                    <NumberFieldInput tabindex="2" id="newHP" class="input h-8" />
                  </NumberFieldRoot>
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <Label for="newInitiative">Iniciativa</Label>
                  <NumberFieldRoot :min="1" v-model="newInitiative" class="col-span-2">
                    <NumberFieldInput tabindex="3" id="newInitiative" class="input h-8" />
                  </NumberFieldRoot>
                </div>
                <div class="flex justify-end gap-2">
                  <button @click="changeNewVisibility" tabindex="4" class="btn btn-neutral btn-sm">
                    <Icon v-if="newVisibility === Visibility.Full" icon="tabler:eye" height="24" />
                    <Icon v-else-if="newVisibility === Visibility.Half" icon="tabler:eye-off" height="24" />
                    <Icon v-else-if="newVisibility === Visibility.None" icon="tabler:eye-closed" height="24" />
                  </button>
                  <button @click="clearNewCombatant" tabindex="5" class="btn btn-error btn-sm"><Icon icon="tabler:eraser" height="24" />Limpar</button>
                  <button @click="addCombatant" tabindex="6" class="btn btn-neutral btn-sm"><Icon icon="tabler:plus" height="24" />Adicionar</button>
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
