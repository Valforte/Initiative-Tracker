<script setup lang="ts">
import {PopoverContent, PopoverRoot, PopoverTrigger} from "reka-ui";

</script>

<template>
  <PopoverRoot>
    <PopoverTrigger asChild>
      <span class="pl-2 underline cursor-help">?</span>
    </PopoverTrigger>
    <PopoverContent className="z-50 mt-2 p-2 rounded-md shadow-md/50 bg-base-100 text-base-content text-lg w-full text-left">
      <slot></slot>
    </PopoverContent>
  </PopoverRoot>
</template>

<style scoped>

</style>
