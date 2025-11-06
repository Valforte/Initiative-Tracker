<script setup lang="ts">

import {colorIsDark, Combatant, Visibility} from "./functions.ts";
import {conditions} from "./db.ts";
import { Icon } from "@iconify/vue";
import {ref} from "vue";
import {text} from "./lang.ts";
import {useStorage} from "@vueuse/core";

const lang = useStorage('lang', 'en')

defineProps<{
  turn: Number,
  combatants: Array<Combatant>
}>()

const currentConditionTooltip = ref<string | undefined>('')

function getConditionTooltip(condition: string, setTooltip: boolean = false): string | undefined {
  let currentCondition = conditions.find((c) => c['name_'+lang.value]?.toLowerCase() === condition.toLowerCase())?.['description_'+lang.value]
  if (!currentCondition) {
    currentCondition = conditions.find((c) => c.name_en.toLowerCase() === condition.toLowerCase())?.description_en
  }

  if (setTooltip) {
    currentConditionTooltip.value = currentCondition
  }
  return currentCondition
}

function hideConditionTooltip(): void {
  currentConditionTooltip.value = ''
}
</script>

<template>
  <div class="overflow-hidden rounded-box border border-base-content/5 bg-base-100 my-8">
    <table class="table table-lg table-fixed">
      <thead class="bg-base-300 text-center border-x-3 border-base-300">
      <tr>
        <th class="w-24">#</th>
        <th class="w-64">{{text.table.name[lang]}}</th>
        <th class="">{{text.table.hp[lang]}}</th>
        <th class="">{{text.table.conditions[lang]}}</th>
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
            <div>
              <progress
                v-if="combatant.visibility === Visibility.Full && combatant.maxTempHP > 0"
                class="progress h-3 w-full progress-info"
                :value="combatant.tempHP"
                :max="combatant.maxTempHP"
              />
              <progress
                class="progress h-6 w-full"
                :class="{
                  'progress-success': combatant.currentHP / combatant.totalHP >= 2/3,
                  'progress-warning': combatant.currentHP / combatant.totalHP < 2/3 && combatant.currentHP / combatant.totalHP >= 1/3,
                  'progress-error': combatant.currentHP / combatant.totalHP < 1/3,
                }"
                :value="combatant.visibility == Visibility.Full ? combatant.currentHP : 0"
                :max="combatant.totalHP"
              />
            </div>
          </td>
          <td>
            <template v-for="(condition) in combatant.conditions">
              <span
                  :class="['badge badge-lg m-0.5 select-none', {
                    'text-accent-content': !colorIsDark(condition.color),
                    'cursor-pointer': getConditionTooltip(condition.name),
                    'border-2 border-warning': getConditionTooltip(condition.name),
                  }]"
                  :style="[{
                    backgroundColor: condition.color
                  }]"
                  @click="() => getConditionTooltip(condition.name, true)"
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

    <div class="toast toast-center" v-if="currentConditionTooltip">
      <div class="alert alert-info text-lg text-justify">
        <div class="badge badge-info shadow-sm/50 p-1 absolute top-[-7px] right-1" @click="hideConditionTooltip"><Icon icon="tabler:x" /></div>
        <span>{{currentConditionTooltip}}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
