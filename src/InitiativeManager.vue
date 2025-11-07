<script setup lang="ts">
import {computed, ref} from "vue";
import {Combatant, Condition, defaultCombatants, Visibility} from "./functions.ts";
import {useStorage} from "@vueuse/core";
import DMView from "./DMView.vue";
import PlayerView from "./PlayerView.vue";

const turn = useStorage('turn', 0)
const round = useStorage('round', 1)

/**
 * Combatants stored in localStorage with custom serialization
 * Must reconstruct class instances (Combatant and Condition) from plain objects
 * because localStorage only stores JSON and loses class methods
 */
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
              return new Combatant(combatant.name, combatant.totalHP, combatant.initiative, combatant.currentHP, combatant.conditions.map((condition: Condition) => { return new Condition(condition.name, condition.value)}), combatant.visibility, combatant.tempHP || 0, combatant.maxTempHP || 0)
            })
          }
          return defaultCombatants
        },
        write: (v: any) => JSON.stringify(v)
      }
    }
)
const isDMView = ref<boolean>(new URLSearchParams(window.location.search).get("view") !== "player")

/**
 * Sorts combatants by initiative (highest first)
 * Ties are broken alphabetically by name
 */
const orderedCombatants = computed(() => {
  return combatants.value.sort((a: Combatant, b: Combatant) => {
    return b.initiative - a.initiative === 0 ? a.name > b.name ? 1 : -1 : b.initiative - a.initiative
  })
})

function reset() {
  turn.value = 0
  round.value = 1
}

/**
 * Advances to the next turn, skipping hidden combatants
 * Increments round when cycling back to the top of initiative order
 * Does nothing if all combatants are hidden
 */
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
  combatants.value.push(new Combatant(name, HP, initiative, HP, [], visibility, 0, 0))
}

function removeCombatant(index: number): void {
  if (index < turn.value) {
    turn.value -= 1
  } else if (index == combatants.value.length) {
    nextTurn()
  }
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
      @newCombatant="addCombatant"
      @removeCombatant="removeCombatant"
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
