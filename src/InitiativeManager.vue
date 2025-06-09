<script setup lang="ts">
import {computed, ref} from "vue";
import {Combatant, Condition, defaultCombatants, Visibility} from "./functions.ts";
import {useStorage} from "@vueuse/core";
import DMView from "./DMView.vue";
import PlayerView from "./PlayerView.vue";

const turn = useStorage('turn', 0)
const round = useStorage('round', 0)
const combatants = useStorage(
    'combatants',
    defaultCombatants,
    undefined,
    {
      serializer: {
        read: (v: any) => {
          if (v) {
            let parsedItems = JSON.parse(v)
            return parsedItems.map((combatant: Combatant) => {
              return new Combatant(combatant.name, combatant.totalHP, combatant.initiative, combatant.currentHP, combatant.conditions.map((condition: Condition) => { return new Condition(condition.name, condition.value)}), combatant.visibility)
            })
          }
          return defaultCombatants
        },
        write: (v: any) => JSON.stringify(v)
      }
    }
)
const isDMView = ref<boolean>(new URLSearchParams(window.location.search).get("view") !== "player")

function setPlayerView() {
  window.location.href = '?view=player'
}

const orderedCombatants = computed(() => {
  return combatants.value.sort((a: Combatant, b: Combatant) => {
    return b.initiative - a.initiative === 0 ? a.name > b.name ? 1 : -1 : b.initiative - a.initiative
  })
})

function reset() {
  turn.value = 0
  round.value = 0
  combatants.value = null
}

function nextTurn() {
  if (orderedCombatants.value.every((combatant: Combatant) => combatant.visibility === Visibility.None)) {
    return
  }

  let newTurn: number = turn.value

  do {
    newTurn++

    if (newTurn >= orderedCombatants.value.length) {
      newTurn = 0
      round.value++
    }
  } while (newTurn <= orderedCombatants.value.length - 1 && orderedCombatants.value[newTurn].visibility === Visibility.None)

  turn.value = newTurn
}

function addCombatant(name: string, HP: number, initiative: number, visibility: Visibility): void {
  combatants.value.push(new Combatant(name, HP, initiative, HP, [], visibility))
}

</script>

<template>
  <DMView
      v-if="isDMView"
      :turn="turn"
      :round="round"
      :combatants="orderedCombatants"
      @nextTurn="nextTurn"
      @reset="reset"
      @setPlayerView="setPlayerView"
      @newCombatant="addCombatant"
  />
  <PlayerView
      v-else
      :turn="turn"
      :round="round"
      :combatants="orderedCombatants"
  />
</template>

<style scoped>

</style>
