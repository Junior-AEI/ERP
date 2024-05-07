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

import type { SelectEvent } from 'node_modules/radix-vue/dist/Combobox/ComboboxItem'
import type { AcceptableValue } from 'node_modules/radix-vue/dist/Combobox/ComboboxRoot'
import { type RouteRecordNormalized } from 'vue-router'

import router from '@/router'
import type { MaterialSymbol } from 'material-symbols'

const sortRoutes = (a: RouteRecordNormalized, b: RouteRecordNormalized) => {
  const aSlashs = a.path.split('/').length
  const bSlashs = b.path.split('/').length
  if (aSlashs === bSlashs && a.name && b.name) {
    const aString = a.name as string
    const bString = b.name as string
    return aString.localeCompare(bString)
  }
  return aSlashs - bSlashs
}

const routes = router
  .getRoutes()
  .filter((route) => !route.path.includes(':'))
  .filter((route) => route.path !== '/login')
  .sort(sortRoutes)

const handleSelect = (ev: SelectEvent<AcceptableValue>) => {
  if (ev.detail.value) {
    const { path } = decodeNameAndPath(ev.detail.value as string)
    router.push(path)
  }
  emit('search-close')
}

const encodeNameAndPath = (name: string, path: string) => {
  return `${name}!.%separator??${path}`
}

const decodeNameAndPath = (value: string) => {
  const [name, path] = value.split('!.%separator??')
  return { name, path }
}
</script>

<template>
  <div>
    <CommandDialog v-model:open="openRef">
      <CommandInput placeholder="Rechercher..." />
      <CommandList>
        <CommandEmpty>Aucun résultat </CommandEmpty>
        <!--CommandGroup heading="Suggestions">
          <CommandItem value="calendar"> Calendar </CommandItem>
          <CommandItem value="search-emoji"> Search Emoji </CommandItem>
          <CommandItem value="calculator"> Calculator </CommandItem>
        </CommandGroup>
        <CommandSeparator /-->
        <CommandGroup heading="Pages">
          <CommandItem
            v-for="route in routes"
            :key="route.name"
            @select="handleSelect"
            :value="encodeNameAndPath(route.name as string, route.path)"
            class="flex gap-2"
          >
            <Icon :name="route.meta.icon as MaterialSymbol" />
            {{ route.name }}
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  </div>
</template>
