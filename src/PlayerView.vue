<script setup lang="ts">

import PlayerTable from "./PlayerTable.vue";
import {Combatant} from "./functions.ts";

defineProps({
  turn: Number,
  round: Number,
  combatants: Array<Combatant>,
})
</script>

<template>
  <div>
    <h1>Rodada {{round}}</h1>
    <PlayerTable :combatants="combatants" :turn="turn" />
  </div>
</template>

<style scoped>

</style>
