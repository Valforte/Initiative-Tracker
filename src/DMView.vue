<script setup lang="ts">

import DMTable from "./DMTable.vue";
import {Combatant} from "./functions.ts";

defineEmits<{
  (e: 'nextTurn'): void
  (e: 'reset'): void
  (e: 'setPlayerView'): void
}>()

defineProps({
  turn: Number,
  round: Number,
  combatants: Array<Combatant>,
})
</script>

<template>
  <div>
    <article class="prose ml-8">
      <h3>Rodada {{round}}</h3>
    </article>
    <DMTable :combatants="combatants" :turn="turn" />
    <div class="flex gap-4">
      <button class="btn btn-neutral" @click="$emit('nextTurn')">Avançar</button>
      <button class="btn btn-error" @click="$emit('reset')">Resetar</button>
      <button class="btn btn-neutral" @click="$emit('setPlayerView')">Player View</button>
    </div>
  </div>
</template>

<style scoped>

</style>
