<script setup lang="ts">

import {colorIsDark, Combatant, Visibility} from "./functions.ts";

defineProps({
  turn: Number,
  combatants: Array<Combatant>
})
</script>

<template>
  <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 my-8">
    <table class="table table-lg">
      <thead class="bg-base-300 text-center">
      <tr>
        <th class="w-1/12">#</th>
        <th class="w-3/12 text-left">Nome</th>
        <th class="w-4/12">PV</th>
        <th class="w-3/12">Condições</th>
      </tr>
      </thead>
      <tbody>
      <template v-for="(combatant, i) in combatants">
        <tr
            v-if="combatant.visibility !== Visibility.None"
            :class="{
                  'bg-base-200': i === turn,
                  'text-amber-300': i === turn,
                  'border-x-amber-300': i === turn,
                  'border-x-3': i === turn,
                  'border-spacing-x-0': i === turn,
                }"
        >
          <td class="text-center">{{combatant.initiative}}</td>
          <td>{{combatant.name}}</td>
          <td class="text-center">
            <progress v-if="combatant.visibility === Visibility.Full" class="progress text-amber-300 h-6" :value="combatant.currentHP" :max="combatant.totalHP"></progress>
          </td>
          <td>
                <span
                    :class="['badge badge-lg m-0.5 select-none', {
                      'text-accent-content': !colorIsDark(condition.color)
                    }]"
                    :style="[{
                      backgroundColor: condition.color
                    }]"
                    v-for="(condition) in combatant.conditions"
                >
                  {{condition.name}}
                  <span v-if="condition.value > 1">
                    {{condition.value}}
                  </span>
                </span>
          </td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>
