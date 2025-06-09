<script setup lang="ts">

import {colorIsDark, Combatant, Visibility} from "./functions.ts";
import { Icon } from "@iconify/vue";
import {useStorage} from "@vueuse/core";

defineProps({
  turn: Number,
  combatants: Array<Combatant>
})

const HPValue = useStorage('HPValue', 1)
</script>

<template>
  <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 my-8">
    <table class="table table-lg">
      <thead class="bg-base-300 text-center">
      <tr>
        <th>Ações</th>
        <th class="w-1/12">#</th>
        <th class="w-3/12 text-left">Nome</th>
        <th class="w-4/12">
          <input
              type="number"
              class="input text-center w-20"
              min="1"
              v-model="HPValue"
          >
        </th>
        <th class="w-3/12">Condições</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="(combatant, i) in combatants"
          :class="{
                'bg-base-200': i === turn,
                'text-amber-300': i === turn,
                'border-x-amber-300': i === turn,
                'border-x-3': i === turn,
                'border-spacing-x-0': i === turn,
              }"
      >
        <td>
          <button class="btn btn-neutral btn-sm p-2" @click.left="() => combatant.changeVisibility(false)" @click.right.prevent="() => combatant.changeVisibility(true)">
            <Icon v-if="combatant.visibility === Visibility.Full" icon="tabler:eye" height="24" />
            <Icon v-else-if="combatant.visibility === Visibility.Half" icon="tabler:eye-off" height="24" />
            <Icon v-else-if="combatant.visibility === Visibility.None" icon="tabler:eye-closed" height="24" />
          </button>
          <button class="btn btn-error btn-sm p-2">
            <Icon icon="tabler:trash" height="24" />
          </button>
        </td>
        <td class="text-center">
          <input
              type="number"
              class="input text-center w-20"
              min="1"
              v-model.lazy="combatant.initiative"
          >
        </td>
        <td>{{combatant.name}}</td>
        <td class="text-center">
          <progress class="progress text-amber-300 h-6" :value="combatant.currentHP" :max="combatant.totalHP"></progress>
          <button class="btn p-2 btn-error" @click="() => combatant.changeHP(-HPValue)">
            <Icon icon="tabler:minus" height="24" />
          </button>
          <button class="btn btn-soft btn-info p-2" @click="() => combatant.changeHP(combatant.totalHP)">
            {{combatant.currentHP}}/{{combatant.totalHP}}
          </button>
          <button class="btn btn-success p-2" @click="() => combatant.changeHP(HPValue)">
            <Icon icon="tabler:plus" height="24" />
          </button>
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
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>
