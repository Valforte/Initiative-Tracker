<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed } from "vue";

const props = defineProps<{
  line: string
}>();

interface ParsedPart {
  type: 'text' | 'icon' | 'br';
  content?: string;
  icon?: string;
  className?: string;
}

const parsedLine = computed(() => {
  if (props.line === '<br />') {
    return [{ type: 'br' as const }];
  }

  const parts: ParsedPart[] = [];
  let lastIndex = 0;
  const iconRegex = /<icon:([^ >]+)([^>]*) \/>/g;
  let match;

  while ((match = iconRegex.exec(props.line)) !== null) {
    // Add text before the icon
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: props.line.substring(lastIndex, match.index)
      });
    }

    // Add the icon
    const iconName = match[1];
    const attrs = match[2];
    const classMatch = attrs.match(/class="([^"]*)"/);
    const className = classMatch ? classMatch[1] : '';

    parts.push({
      type: 'icon',
      icon: iconName,
      className: className
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < props.line.length) {
    parts.push({
      type: 'text',
      content: props.line.substring(lastIndex)
    });
  }

  return parts;
});
</script>

<template>
  <p>
    <template v-for="(part, index) in parsedLine" :key="index">
      <br v-if="part.type === 'br'" />
      <Icon v-else-if="part.type === 'icon'" :icon="part.icon!" :class="['inline-block', part.className]" height="24" />
      <span v-else v-html="part.content"></span>
    </template>
  </p>
</template>
