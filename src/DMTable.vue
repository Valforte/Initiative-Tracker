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
import {conditions} from "./db.ts";
import {text} from "./lang.ts";
import HelpText from "./HelpText.vue";

const lang = useStorage('lang', 'en')

const props = defineProps<{
  turn: Number,
  combatants: Array<Combatant>
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
          {{text.table.actions[lang]}}
          <HelpText>
            <p><Icon icon="tabler:eye-off" class="inline-block" /> Oculto da visão do jogador; é ignorado durante a passagem de turno</p>
            <p><Icon icon="tabler:eye-closed" class="inline-block" /> Barra de vida NÃO visível para os jogadores</p>
            <p><Icon icon="tabler:eye" class="inline-block" /> Barra de vida visível para os jogadores</p>
            <br />
            <p><Icon icon="ph:mouse-left-click-fill" class="inline-block" /> Clique no botão para alternar entre <Icon icon="tabler:eye-off" class="inline-block" /> e <Icon icon="tabler:eye-closed" class="inline-block" /></p>
            <p><Icon icon="ph:mouse-right-click-fill" class="inline-block" /> Clique direito para definir <Icon icon="tabler:eye" class="inline-block" /></p>
          </HelpText>
        </th>
        <th class="w-32">#</th>
        <th class="text-left w-64">{{text.table.name[lang]}}</th>
        <th class="">
          <NumberFieldRoot class="inline-block" :min="1" v-model.lazy="HPValue">
            <NumberFieldInput class="input text-center w-20" />
          </NumberFieldRoot>
          <HelpText>
            <p>Defina aqui o valor para aumentar/diminuir</p>
            <br />
            <p><Icon icon="ph:mouse-left-click-fill" class="inline-block" /> Clique em <Icon icon="tabler:minus" class="inline-block" /> para subtrair vida</p>
            <p><Icon icon="ph:mouse-left-click-fill" class="inline-block" /> Clique em <Icon icon="tabler:plus" class="inline-block" /> para adicionar vida</p>
            <p><Icon icon="ph:mouse-left-click-fill" class="inline-block" /> Clique em <Icon icon="tabler:math-x-divide-y-2" class="inline-block" /> para voltar a vida ao máximo</p>
          </HelpText>
        </th>
        <th class="">
          {{text.table.conditions[lang]}}
          <HelpText>
            <p><Icon icon="ph:mouse-left-click-fill" class="inline-block" /> Clique em <Icon icon="tabler:plus" class="inline-block" /> para adicionar uma nova condição</p>
            <p><Icon icon="ph:mouse-left-click-fill" class="inline-block" /> Clique em <Icon icon="tabler:minus" class="inline-block" /> para reduzir 1 estágio de todas as condições</p>
            <br />
            <p><Icon icon="ph:mouse-left-click-fill" class="inline-block" /> Clique em uma condição para reduzir 1 estágio</p>
            <p><Icon icon="ph:mouse-right-click-fill" class="inline-block" /> Clique direito em uma condição para aumentar 1 estágio</p>
            <br />
            <p>Condições sem valor possuem 1 estágio</p>
            <p>A condição é removida ao reduzir de 1 estágio para 0</p>
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
            <button class="btn btn-neutral btn-sm p-2" @click.left="() => combatant.changeVisibility(false)" @click.right.prevent="() => combatant.changeVisibility(true)">
              <Icon v-if="combatant.visibility === Visibility.Full" icon="tabler:eye" height="24" />
              <Icon v-else-if="combatant.visibility === Visibility.Half" icon="tabler:eye-off" height="24" />
              <Icon v-else-if="combatant.visibility === Visibility.None" icon="tabler:eye-closed" height="24" />
            </button>
            <button class="btn btn-error btn-sm p-2" @click="() => removeCombatant(i)">
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
                    <Label for="newConditionName">{{text.dm_table.addConditionName[lang]}}</Label>
                    <input id="newConditionName" tabindex="1" type="text" class="input col-span-2 h-8" list="conditions" v-model="newConditionName" />
                  </div>
                  <div class="grid grid-cols-3 items-center gap-4">
                    <Label for="newConditionValue">{{text.dm_table.addConditionValue[lang]}}</Label>
                    <NumberFieldRoot :min="1" v-model="newConditionValue" class="col-span-2">
                      <NumberFieldInput tabindex="2" id="newConditionValue" class="input h-8" />
                    </NumberFieldRoot>
                  </div>
                  <div class="flex justify-end gap-2">
                    <button @click="clearNewCondition" tabindex="5" class="btn btn-error btn-sm"><Icon icon="tabler:eraser" height="24" />{{text.dm_actions.clear[lang]}}</button>
                    <button @click="() => addNewCondition(combatant, newConditionName, newConditionValue)" tabindex="6" class="btn btn-neutral btn-sm"><Icon icon="tabler:plus" height="24" />{{text.dm_actions.add[lang]}}</button>
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
      <option v-for="condition in conditions">{{condition['name_'+lang]}}</option>
    </datalist>
  </div>
</template>

<style scoped>

</style>
