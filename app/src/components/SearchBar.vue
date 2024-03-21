<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core'

import { watch, ref } from 'vue'

const props = defineProps({
  open: Boolean
})

watch(
  () => props.open,
  (v) => {
    openRef.value = v
  }
)

const openRef = ref(props.open)

watch(
  () => openRef.value,
  (v) => {
    if (v !== props.open && v) {
      emit('search-open')
    } else if (v !== props.open && !v) {
      emit('search-close')
    }
  }
)

const emit = defineEmits(['search-open', 'search-close'])

const { Meta_K, Ctrl_K } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) e.preventDefault()
  }
})

const { Escape } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.key === 'Escape') e.preventDefault()
  }
})

watch([Meta_K, Ctrl_K], (v) => {
  if (v[0] || v[1]) handleOpenChange()
})

watch(Escape, (v) => {
  if (v) {
    emit('search-close')
  }
})

function handleOpenChange() {
  emit('search-open')
}
</script>

<template>
  <div>
    <CommandDialog v-model:open="openRef">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem value="calendar"> Calendar </CommandItem>
          <CommandItem value="search-emoji"> Search Emoji </CommandItem>
          <CommandItem value="calculator"> Calculator </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem value="profile"> Profile </CommandItem>
          <CommandItem value="billing"> Billing </CommandItem>
          <CommandItem value="settings"> Settings </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  </div>
</template>
