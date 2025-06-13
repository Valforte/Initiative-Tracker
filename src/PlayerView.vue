<script setup lang="ts">

import PlayerTable from "./PlayerTable.vue";
import {Combatant} from "./functions.ts";
import {text} from "./lang.ts";
import {useStorage} from "@vueuse/core";

const lang = useStorage('lang', 'en')

defineProps<{
  turn: Number,
  round: Number,
  combatants: Array<Combatant>,
}>()
</script>

<template>
  <div>
    <article class="prose ml-8">
      <h3>{{text.table.round[lang]}} {{round}}</h3>
    </article>
    <PlayerTable :combatants="combatants" :turn="turn" class="shadow-xl/50" />
  </div>
</template>

<style scoped>

</style>
