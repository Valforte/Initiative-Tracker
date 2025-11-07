<script setup lang="ts">

import PlayerTable from "./PlayerTable.vue";
import {Combatant} from "./functions.ts";
import {useTranslations} from "./lang.ts";

const { t } = useTranslations()

defineProps<{
  turn: number,
  round: number,
  combatants: Combatant[],
}>()
</script>

<template>
  <div>
    <article class="prose ml-8">
      <h3>{{t.table.round}} {{round}}</h3>
    </article>
    <PlayerTable :combatants="combatants" :turn="turn" class="shadow-xl/50" />
  </div>
</template>

<style scoped>

</style>
