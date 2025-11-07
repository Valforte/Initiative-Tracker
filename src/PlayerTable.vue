<script setup lang="ts">

import {colorIsDark, Combatant, Visibility} from "./functions.ts";
import {useConditions} from "./db.ts";
import { Icon } from "@iconify/vue";
import {ref} from "vue";
import {useTranslations} from "./lang.ts";

const { t, lang } = useTranslations()

defineProps<{
  turn: number,
  combatants: Combatant[]
}>()

const currentConditionName = ref<string | undefined>('')
const currentConditionTooltip = ref<string | undefined>('')

function getConditionTooltip(condition: string, setTooltip: boolean = false): string | undefined {
  const conditions = useConditions(lang.value)
  let currentCondition: string | undefined

  // Search through all condition keys to find a match by name
  for (const key in conditions) {
    if (conditions[key].name.toLowerCase() === condition.toLowerCase()) {
      currentCondition = conditions[key].description
      break
    }
  }

  // Fallback to English if not found
  if (!currentCondition) {
    const conditionsEn = useConditions('en')
    for (const key in conditionsEn) {
      if (conditionsEn[key].name.toLowerCase() === condition.toLowerCase()) {
        currentCondition = conditionsEn[key].description
        break
      }
    }
  }

  if (setTooltip) {
    currentConditionName.value = condition
    currentConditionTooltip.value = currentCondition
  }
  return currentCondition
}

function hideConditionTooltip(): void {
  currentConditionName.value = ''
  currentConditionTooltip.value = ''
}
</script>

<template>
  <div class="overflow-hidden rounded-box border border-base-content/5 bg-base-100 my-8">
    <table class="table table-lg table-fixed">
      <thead class="bg-base-300 text-center border-x-3 border-base-300">
      <tr>
        <th class="w-24">#</th>
        <th class="w-64">{{t.table.name}}</th>
        <th class="">{{t.table.hp}}</th>
        <th class="">{{t.table.conditions}}</th>
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
        <div class="badge badge-info shadow-sm/50 p-1 absolute top-1 right-6" @click="hideConditionTooltip"><Icon icon="tabler:x" /></div>
        <div>
          <p class="text-base-300 font-bold pb-2">{{currentConditionName}}</p>
          <p class="text-base-100/80">{{currentConditionTooltip}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
