<script setup lang="ts">

import {colorIsDark, Combatant, Visibility} from "./functions.ts";

defineProps<{
  turn: Number,
  combatants: Array<Combatant>
}>()
</script>

<template>
  <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 my-8">
    <table class="table table-lg table-fixed">
      <thead class="bg-base-300 text-center border-x-3 border-base-300">
      <tr>
        <th class="w-24">#</th>
        <th class="w-64">Nome</th>
        <th class="">PV</th>
        <th class="">Condições</th>
      </tr>
      </thead>
      <tbody>
      <template v-for="(combatant, i) in combatants">
        <tr
            v-if="combatant.visibility !== Visibility.None"
            :class="[{
                  'bg-base-200': i === turn,
                  'text-accent': i === turn,
                  'border-x-accent': i === turn,
                  'border-x-3': i === turn,
                  'border-spacing-x-0': i === turn,
                }, 'hover:bg-base-300']"
        >
          <td class="text-center">{{combatant.initiative}}</td>
          <td class="">{{combatant.name}}</td>
          <td class="text-center">
            <progress
                class="progress h-6"
                :class="{
                  'progress-success': combatant.currentHP / combatant.totalHP >= 2/3,
                  'progress-warning': combatant.currentHP / combatant.totalHP < 2/3 && combatant.currentHP / combatant.totalHP >= 1/3,
                  'progress-error': combatant.currentHP / combatant.totalHP < 1/3,
                }"
                :value="combatant.visibility == Visibility.Full ? combatant.currentHP : 0" :max="combatant.totalHP"
            />
          </td>
          <td class="flex justify-center gap-1">
            <template v-for="(condition) in combatant.conditions">
                <span
                    :class="['badge badge-lg select-none', {
                      'text-accent-content': !colorIsDark(condition.color)
                    }]"
                    :style="[{
                      backgroundColor: condition.color
                    }]"
                >
                  {{condition.name}}
                  <span v-if="condition.value > 1">
                    {{condition.value}}
                  </span>
                </span>
            </template>
          </td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>
