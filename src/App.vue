<script setup lang="ts">
import InitiativeManager from "./InitiativeManager.vue";
import {Icon} from "@iconify/vue";
import {useStorage} from "@vueuse/core";
import {onMounted, watch} from "vue";
import {ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport} from "reka-ui";
import {text} from "./lang.ts";

const lang = useStorage('lang', 'en')

const themes = ['light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween', 'garden', 'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 'wireframe', 'black', 'luxury', 'dracula', 'cmyk', 'autumn', 'business', 'acid', 'lemonade', 'night', 'coffee', 'winter', 'dim', 'nord', 'sunset', 'caramellatte', 'abyss', 'silk']
const selectedTheme = useStorage('theme', 'dracula')

function setTheme(theme: string): void {
  console.log(theme);
  selectedTheme.value = theme
}

watch(selectedTheme, (newVal) => {
  document.querySelector('html')?.setAttribute('data-theme', newVal)
})

onMounted(() => {
  document.querySelector('html')?.setAttribute('data-theme', selectedTheme.value)
})
</script>

<template>
  <div class="group fixed top-1 right-1 z-50">
    <div class="dropdown dropdown-end">
      <button class="btn btn-neutral invisible group-hover:visible">{{text.options.language[lang]}}</button>
      <div class="dropdown-content bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm">
        <div><button class="btn btn-block" @click="() => lang = 'en'">English</button></div>
        <div><button class="btn btn-block" @click="() => lang = 'pt_BR'">Português (Brasil)</button></div>
      </div>
    </div>
    <div class="dropdown dropdown-end">
      <button class="btn btn-neutral invisible group-hover:visible">{{text.options.theme[lang]}}
        <Icon icon="tabler:chevron-down" height="24"/>
      </button>
      <div class="dropdown-content">
        <ScrollAreaRoot class="h-96 overflow-hidden shadow-sm">
          <ScrollAreaViewport class="w-full h-full">
            <div class="grid grid-cols-1 bg-transparent border-transparent rounded-box z-1 w-52">
              <template v-for="theme in themes">
                <div :data-theme="theme"
                     @click="() => setTheme(theme)"
                     class="border-base-content/20 hover:border-base-content/40 overflow-hidden rounded-lg border outline-2 outline-offset-2 outline-transparent"
                     data-act-class="outline-base-content!">
                  <div class="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                    <div class="grid grid-cols-5 grid-rows-3">
                      <div class="bg-base-200 col-start-1 row-span-2 row-start-1"></div>
                      <div class="bg-base-300 col-start-1 row-start-3"></div>
                      <div class="bg-base-100 col-span-4 col-start-2 row-span-3 row-start-1 flex flex-col gap-1 p-2">
                        <div class="font-bold">
                          {{ theme }}
                        </div>
                        <div class="flex flex-wrap gap-1">
                          <div class="bg-primary flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                            <div class="text-primary-content text-sm font-bold">A</div>
                          </div>
                          <div class="bg-secondary flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                            <div class="text-secondary-content text-sm font-bold">A</div>
                          </div>
                          <div class="bg-accent flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                            <div class="text-accent-content text-sm font-bold">A</div>
                          </div>
                          <div class="bg-neutral flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                            <div class="text-neutral-content text-sm font-bold">A</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </ScrollAreaViewport>
          <ScrollAreaScrollbar
              class="flex select-none touch-none p-0.5 z-20 bg-blackA1 transition-colors duration-[160ms] ease-out hover:bg-blackA2 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
              orientation="vertical"
          >
            <ScrollAreaThumb
                class="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]"
            />
          </ScrollAreaScrollbar>
        </ScrollAreaRoot>
      </div>
    </div>
  </div>

  <InitiativeManager class="m-6"/>
</template>

<style scoped>
</style>
