<template>
  <Collapsible class="flex w-full flex-col gap-2" v-model:open="isOpen">
    <div class="flex w-full items-center justify-between">
      <slot name="parent"></slot>
      <CollapsibleTrigger as-child>
        <Button
          :class="isOpen ? 'rotate-180' : ''"
          icon="expand_more"
          size="icon"
          variant="link"
          class="transform font-normal transition-transform"
        ></Button>
      </CollapsibleTrigger>
    </div>
    <CollapsibleContent class="gap-2 pb-1 pl-3 text-sm">
      <slot name="children"></slot>
    </CollapsibleContent>
  </Collapsible>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
</script>
