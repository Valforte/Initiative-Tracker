<script setup lang="ts">

import {ref, computed} from "vue";
import {colorIsDark, Combatant, Visibility} from "./functions.ts";
import { Icon } from "@iconify/vue";
import {useStorage} from "@vueuse/core";
import {
  Label,
  NumberFieldInput,
  NumberFieldRoot,
  PopoverArrow,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger
} from "reka-ui";
import {useConditions} from "./db.ts";
import {useTranslations} from "./lang.ts";
import HelpText from "./HelpText.vue";
import HelpTextLine from "./HelpTextLine.vue";

const { t, lang } = useTranslations()
const conditions = computed(() => useConditions(lang.value))

const props = defineProps<{
  turn: number,
  combatants: Combatant[]
}>()

const emit = defineEmits<{
  (e: 'removeCombatant', index: number): void
}>()

const HPValue = useStorage('HPValue', 1)
const isConditionPopoverOpen = ref<boolean[]>(props.combatants.map(() => false ))
const newConditionName = ref<string>('')
const newConditionValue = ref<number>(1)

function clearNewCondition() {
  newConditionName.value = ''
  newConditionValue.value = 1
  document.getElementById('newConditionName')?.focus()
}

function addNewCondition(combatant: Combatant, name: string, value: number): void {
  combatant.newCondition(name, value)
  isConditionPopoverOpen.value = isConditionPopoverOpen.value.map(() => false)
  setTimeout(clearNewCondition, 1)
}

function removeCombatant(i: number): void {
  props.combatants.splice(i, 1)
  emit('removeCombatant', i)
}

</script>

<template>
  <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 my-8">
    <table class="table table-lg table-fixed">
      <thead class="bg-base-300 text-center border-x-3 border-base-300">
      <tr>
        <th class="w-32">
          {{t.table.actions}}
          <HelpText>
            <HelpTextLine v-for="line in t.helpText.actions" :key="line" :line="line" />
          </HelpText>
        </th>
        <th class="w-32">#</th>
        <th class="text-left w-64">{{t.table.name}}</th>
        <th class="">
          <NumberFieldRoot class="inline-block" :min="1" v-model.lazy="HPValue">
            <NumberFieldInput class="input text-center w-20" />
          </NumberFieldRoot>
          <HelpText>
            <HelpTextLine v-for="line in t.helpText.hp" :key="line" :line="line" />
          </HelpText>
        </th>
        <th class="">
          {{t.table.conditions}}
          <HelpText>
            <HelpTextLine v-for="line in t.helpText.conditions" :key="line" :line="line" />
          </HelpText>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="(combatant, i) in combatants"
          :class="{
                'bg-base-200': i === turn,
                'text-accent': i === turn,
                'border-x-accent': i === turn,
                'border-x-3': i === turn,
                'border-spacing-x-0': i === turn,
              }"
      >
        <td>
          <div class="flex justify-center gap-1">
            <button
              class="btn btn-neutral btn-sm p-2"
              @click.left="() => combatant.changeVisibility(false)"
              @click.right.prevent="() => combatant.changeVisibility(true)"
              :aria-label="`Change visibility for ${combatant.name}`"
            >
              <Icon v-if="combatant.visibility === Visibility.Full" icon="tabler:eye" height="24" />
              <Icon v-else-if="combatant.visibility === Visibility.Half" icon="tabler:eye-off" height="24" />
              <Icon v-else-if="combatant.visibility === Visibility.None" icon="tabler:eye-closed" height="24" />
            </button>
            <button
              class="btn btn-error btn-sm p-2"
              @click="() => removeCombatant(i)"
              :aria-label="`Remove ${combatant.name}`"
            >
              <Icon icon="tabler:trash" height="24" />
            </button>
          </div>
        </td>
        <td class="text-center">
          <NumberFieldRoot :min="1" v-model.lazy="combatant.initiative">
            <NumberFieldInput class="input text-center w-20" />
          </NumberFieldRoot>
        </td>
        <td>{{combatant.name}}</td>
        <td class="text-center">
          <div>
            <progress
              v-if="combatant.maxTempHP > 0"
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
              :value="combatant.currentHP"
              :max="combatant.totalHP"
            />
          </div>
          <div class="flex justify-center items-center gap-1 mt-1">
            <button
              class="btn p-2 btn-error"
              @click="() => combatant.changeHP(-HPValue)"
              :aria-label="`Damage ${combatant.name}`"
            >
              <Icon icon="tabler:minus" height="24" />
            </button>
            <button
              class="btn btn-soft btn-info p-2 select-none"
              @click="() => {
                if (combatant.tempHP > 0) {
                  combatant.tempHP = 0;
                  combatant.maxTempHP = 0;
                }
                combatant.currentHP = combatant.totalHP;
              }"
              @click.right.prevent="() => {
                combatant.totalHP = HPValue;
                if (combatant.currentHP > combatant.totalHP) {
                  combatant.currentHP = combatant.totalHP;
                }
              }"
              :aria-label="`${combatant.name} HP: ${combatant.currentHP} of ${combatant.totalHP}`"
            >
              {{combatant.currentHP}}/{{combatant.totalHP}}
              <span v-if="combatant.maxTempHP > 0"> +{{combatant.tempHP}}/{{combatant.maxTempHP}}</span>
            </button>
            <button
              class="btn btn-success p-2"
              @click="() => combatant.changeHP(HPValue)"
              :aria-label="`Heal ${combatant.name}`"
            >
              <Icon icon="tabler:plus" height="24" />
            </button>
            <button
              class="btn btn-info p-2"
              @click="() => combatant.addTempHP(HPValue)"
              :aria-label="`Add temporary HP to ${combatant.name}`"
            >
              <Icon icon="tabler:plus" height="24" />
            </button>
          </div>
        </td>
        <td>
          <button
            class="btn btn-neutral p-2"
            @click="() => combatant.changeConditionValue()"
            :aria-label="`Reduce all conditions on ${combatant.name}`"
          >
            <Icon icon="tabler:minus" height="24" />
          </button>
          <PopoverRoot :open="isConditionPopoverOpen[i]" @update:open="value => isConditionPopoverOpen[i] = value">
            <PopoverTrigger as-child>
              <button
                class="btn btn-neutral p-2 mx-1"
                :aria-label="`Add condition to ${combatant.name}`"
              >
                <Icon icon="tabler:plus" height="24" />
              </button>
            </PopoverTrigger>
            <PopoverPortal>
              <PopoverContent class="card w-80 bg-base-300 card-md shadow-l" role="dialog" aria-label="Add condition">
                <div class="card-body" @keydown.enter.prevent="() => addNewCondition(combatant, newConditionName, newConditionValue)">
                  <div class="grid grid-cols-3 items-center gap-4">
                    <Label for="newConditionName">{{t.dm_table.addConditionName}}</Label>
                    <input id="newConditionName" tabindex="1" type="text" class="input col-span-2 h-8" list="conditions" v-model="newConditionName" aria-label="Condition name" />
                  </div>
                  <div class="grid grid-cols-3 items-center gap-4">
                    <Label for="newConditionValue">{{t.dm_table.addConditionValue}}</Label>
                    <NumberFieldRoot :min="1" v-model="newConditionValue" class="col-span-2">
                      <NumberFieldInput tabindex="2" id="newConditionValue" class="input h-8" />
                    </NumberFieldRoot>
                  </div>
                  <div class="flex justify-end gap-2">
                    <button @click="clearNewCondition" tabindex="5" class="btn btn-error btn-sm"><Icon icon="tabler:eraser" height="24" />{{t.dm_actions.clear}}</button>
                    <button @click="() => addNewCondition(combatant, newConditionName, newConditionValue)" tabindex="6" class="btn btn-neutral btn-sm"><Icon icon="tabler:plus" height="24" />{{t.dm_actions.add}}</button>
                  </div>
                </div>
                <PopoverArrow class="fill-base-300" />
              </PopoverContent>
            </PopoverPortal>
          </PopoverRoot>
          <template v-for="(condition) in combatant.conditions">
            <span
                :class="['badge badge-lg m-0.5 select-none', {
                  'text-accent-content': !colorIsDark(condition.color)
                }]"
                :style="[{
                  backgroundColor: condition.color
                }]"
                @click.left="() => combatant.changeConditionValue(condition)"
                @click.right.prevent="() => combatant.changeConditionValue(condition, true)"
            >
              {{condition.name}}
              <span v-if="condition.value > 1">
                {{condition.value}}
              </span>
            </span>
          </template>
        </td>
      </tr>
      </tbody>
    </table>
    <datalist id="conditions">
      <option v-for="(condition, key) in conditions" :key="key">{{condition.name}}</option>
    </datalist>
  </div>
</template>

<style scoped>

</style>
