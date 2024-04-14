<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { TabsList, type TabsListProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<TabsListProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <TabsList v-bind="delegatedProps" :class="cn(
    'inline-flex items-center rounded-md bg-muted p-1 text-muted-foreground max-w-full gap-2 overflow-y-none overflow-x-auto',
    props.class
  )
    ">
    <slot />
  </TabsList>
</template>
