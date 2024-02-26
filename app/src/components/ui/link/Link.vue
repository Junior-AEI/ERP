import type { computed } from 'vue'; import type { RouterLink } from 'vue-router';
<template>
  <RouterLink v-if="isLocalLink" :to="to" :class="cn(linkVariants({ variant, size }), props.class)">
    <Icon v-if="props.icon" :name="props.icon" class="-m-1" />
    <slot></slot>
  </RouterLink>

  <a v-else :href="to" :class="cn(linkVariants({ variant, size }), props.class)">
    <Icon v-if="props.icon" :name="props.icon" class="-m-1" />
    <slot></slot>
  </a>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { type LinkVariants, linkVariants } from '.'
import { cn } from '@/lib/utils'
import { computed } from 'vue'
import type { IconNames } from '@/types'

const props = defineProps<{
  variant?: LinkVariants['variant']
  size?: LinkVariants['size']
  class?: HTMLAttributes['class']
  to: string
  icon?: IconNames
}>()

const isLocalLink = computed(() => {
  return props.to.startsWith('/')
})
</script>
