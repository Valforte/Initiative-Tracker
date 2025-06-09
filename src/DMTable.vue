<script setup lang="ts">

import {ref} from "vue";
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

const props = defineProps<{
  turn: Number,
  combatants: Array<Combatant>
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

</script>

<template>
  <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 my-8">
    <table class="table table-lg table-fixed">
      <thead class="bg-base-300 text-center border-x-3 border-base-300">
      <tr>
        <th class="w-32">Ações</th>
        <th class="w-32">#</th>
        <th class="text-left w-64">Nome</th>
        <th class="">
          <NumberFieldRoot :min="1" v-model.lazy="HPValue">
            <NumberFieldInput class="input text-center w-20" />
          </NumberFieldRoot>
        </th>
        <th class="">Condições</th>
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
            <button class="btn btn-neutral btn-sm p-2" @click.left="() => combatant.changeVisibility(false)" @click.right.prevent="() => combatant.changeVisibility(true)">
              <Icon v-if="combatant.visibility === Visibility.Full" icon="tabler:eye" height="24" />
              <Icon v-else-if="combatant.visibility === Visibility.Half" icon="tabler:eye-off" height="24" />
              <Icon v-else-if="combatant.visibility === Visibility.None" icon="tabler:eye-closed" height="24" />
            </button>
            <button class="btn btn-error btn-sm p-2" @click="() => combatants?.splice(i, 1)">
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
          <progress
              class="progress h-6"
              :class="{
                  'progress-success': combatant.currentHP / combatant.totalHP >= 2/3,
                  'progress-warning': combatant.currentHP / combatant.totalHP < 2/3 && combatant.currentHP / combatant.totalHP >= 1/3,
                  'progress-error': combatant.currentHP / combatant.totalHP < 1/3,
                }"
              :value="combatant.currentHP"
              :max="combatant.totalHP"
          />
          <button class="btn p-2 btn-error" @click="() => combatant.changeHP(-HPValue)">
            <Icon icon="tabler:minus" height="24" />
          </button>
          <button class="btn btn-soft btn-info p-2 mx-1" @click="() => combatant.changeHP(combatant.totalHP)">
            {{combatant.currentHP}}/{{combatant.totalHP}}
          </button>
          <button class="btn btn-success p-2" @click="() => combatant.changeHP(HPValue)">
            <Icon icon="tabler:plus" height="24" />
          </button>
        </td>
        <td>
          <button class="btn btn-neutral p-2" @click="() => combatant.changeConditionValue()">
            <Icon icon="tabler:minus" height="24" />
          </button>
          <PopoverRoot :open="isConditionPopoverOpen[i]" @update:open="value => isConditionPopoverOpen[i] = value">
            <PopoverTrigger as-child>
              <button class="btn btn-neutral p-2 mx-1">
                <Icon icon="tabler:plus" height="24" />
              </button>
            </PopoverTrigger>
            <PopoverPortal>
              <PopoverContent class="card w-80 bg-base-300 card-md shadow-l">
                <div class="card-body" @keydown.enter.prevent="() => addNewCondition(combatant, newConditionName, newConditionValue)">
                  <div class="grid grid-cols-3 items-center gap-4">
                    <Label for="newConditionName">Nome</Label>
                    <input id="newConditionName" tabindex="1" v-model="newConditionName" class="input col-span-2 h-8" />
                  </div>
                  <div class="grid grid-cols-3 items-center gap-4">
                    <Label for="newConditionValue">Valor</Label>
                    <NumberFieldRoot :min="1" v-model="newConditionValue" class="col-span-2">
                      <NumberFieldInput tabindex="2" id="newConditionValue" class="input h-8" />
                    </NumberFieldRoot>
                  </div>
                  <div class="flex justify-end gap-2">
                    <button @click="clearNewCondition" tabindex="5" class="btn btn-error btn-sm"><Icon icon="tabler:eraser" height="24" />Limpar</button>
                    <button @click="() => addNewCondition(combatant, newConditionName, newConditionValue)" tabindex="6" class="btn btn-neutral btn-sm"><Icon icon="tabler:plus" height="24" />Adicionar</button>
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
  </div>
</template>

<style scoped>

</style>
