<script setup lang="ts">
import {computed} from "vue";
import {useTranslations} from "./lang.ts";
import {useStorage} from "@vueuse/core";
import {getContentSourcesBySystem, getDefaultEnabledSources, type GameSystem} from "./db.ts";
import {Icon} from "@iconify/vue";

const { t } = useTranslations()

defineProps<{
  isOnlineMode: boolean
  sessionId: string
  isDMView: boolean
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'toggleOnlineMode', value: boolean): void
  (e: 'requestReset'): void
  (e: 'close'): void
}>()

// Settings stored in localStorage
const useTempHP = useStorage('useTempHP', true)
const gameSystem = useStorage<GameSystem>('gameSystem', 'pathfinder')

// Initialize enabled content sources using defaults from JSON files
const enabledContentSources = useStorage<string[]>(
  'enabledContentSources',
  getDefaultEnabledSources('pathfinder')
)

// Get available content sources for current system
const availableContentSources = computed(() => {
  return getContentSourcesBySystem(gameSystem.value)
})

// When system changes, reset enabled sources to defaults from JSON files
function onSystemChange(newSystem: GameSystem) {
  gameSystem.value = newSystem
  enabledContentSources.value = getDefaultEnabledSources(newSystem)
}

// Toggle content source
function toggleContentSource(sourceId: string) {
  const index = enabledContentSources.value.indexOf(sourceId)
  if (index > -1) {
    enabledContentSources.value = enabledContentSources.value.filter(id => id !== sourceId)
  } else {
    enabledContentSources.value = [...enabledContentSources.value, sourceId]
  }
}

// Reset to defaults - request dialog from parent
function requestReset() {
  emit('requestReset')
}
</script>

<template>
  <!-- Modal backdrop and container -->
  <div
    v-if="isOpen"
    class="modal modal-open"
    @click.self="$emit('close')"
  >
    <div class="modal-box max-w-lg max-h-[90vh]">
      <!-- Close button -->
      <button
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        @click="$emit('close')"
      >
        <Icon icon="tabler:x" height="20" />
      </button>

      <h3 class="font-bold text-lg mb-4">{{t.options.settings}}</h3>

      <div class="flex flex-col gap-4">
        <!-- Online Mode Toggle (DM only) -->
        <div v-if="isDMView" class="flex items-center justify-between">
          <label class="label cursor-pointer gap-2">
            <input
                type="checkbox"
                class="toggle"
                :checked="isOnlineMode"
                @change="(e) => $emit('toggleOnlineMode', (e.target as HTMLInputElement).checked)"
            />
            <span class="label-text">{{t.dm_actions.onlineMode}}</span>
          </label>
        </div>

        <!-- Use Temporary HP Toggle -->
        <div class="flex items-center justify-between">
          <label class="label cursor-pointer gap-2">
            <input
                type="checkbox"
                class="toggle"
                v-model="useTempHP"
            />
            <span class="label-text">{{t.options.useTempHP}}</span>
          </label>
        </div>

        <!-- Game System Toggle -->
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <button
              class="btn btn-sm flex-1"
              :class="{'btn-primary': gameSystem === 'pathfinder', 'btn-ghost': gameSystem !== 'pathfinder'}"
              @click="onSystemChange('pathfinder')"
            >
              {{t.options.pathfinder}}
            </button>
            <button
              class="btn btn-sm flex-1"
              :class="{'btn-primary': gameSystem === 'dnd5e', 'btn-ghost': gameSystem !== 'dnd5e'}"
              @click="onSystemChange('dnd5e')"
            >
              {{t.options.dnd5e}}
            </button>
          </div>

          <!-- Content Sources Submenu -->
          <div class="border border-base-content/10 rounded-lg p-3 bg-base-200">
            <div class="text-sm font-semibold mb-2">{{t.options.contents}}</div>
            <div class="flex flex-col gap-1 h-[420px] overflow-y-auto pr-2">
              <label
                v-for="source in availableContentSources"
                :key="source.id"
                class="label cursor-pointer justify-start gap-2 py-1"
              >
                <input
                  type="checkbox"
                  class="checkbox checkbox-sm"
                  :checked="enabledContentSources.includes(source.id)"
                  @change="() => toggleContentSource(source.id)"
                />
                <span class="label-text text-sm">{{source.name}}</span>
              </label>
            </div>
          </div>

          <!-- Reset to Defaults Button -->
          <button
            class="btn btn-error btn-sm w-full"
            @click="requestReset"
          >
            <Icon icon="tabler:refresh" height="20" />
            {{t.options.resetToDefaults}}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
