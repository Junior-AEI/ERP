<script setup lang="ts">
import { computed, ref } from 'vue'
import { ComboboxAnchor, ComboboxInput, ComboboxPortal, ComboboxRoot } from 'radix-vue'
import { CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText
} from '@/components/ui/tags-input'

import { type Field } from '.'

const props = defineProps<{
  placeholder: string
  fields: Field[]
}>()

const modelValue = defineModel<string[]>()
const open = ref(false)
const searchTerm = ref('')
console.log('props :', props)

const filteredfields = computed(() =>
  props.fields.filter((i) => {
    if (!modelValue.value || !modelValue.value) {
      return false
    } else {
      return !modelValue.value.includes(i.label)
    }
  })
)
</script>

<template>
  <TagsInput class="w-full flex-col-reverse items-start gap-0 px-0" :model-value="modelValue">
    <div class="flex flex-wrap items-start gap-2 px-3">
      <TagsInputItem v-for="item in modelValue" :key="item" :value="item">
        <TagsInputItemText />
        <TagsInputItemDelete />
      </TagsInputItem>
    </div>

    <ComboboxRoot
      v-model="modelValue"
      v-model:open="open"
      v-model:searchTerm="searchTerm"
      class="w-full"
    >
      <ComboboxAnchor as-child>
        <ComboboxInput :placeholder="placeholder" as-child>
          <TagsInputInput
            class="w-full px-3"
            :class="modelValue && modelValue.length > 0 ? 'mb-1' : ''"
            @keydown.enter.prevent
          />
        </ComboboxInput>
      </ComboboxAnchor>

      <ComboboxPortal>
        <CommandList
          position="popper"
          class="mt-2 w-[--radix-popper-anchor-width] rounded-md border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
        >
          <CommandEmpty />
          <CommandGroup>
            <CommandItem
              v-for="framework in filteredfields"
              :key="framework.value"
              :value="framework.label"
              @select.prevent="
                (ev) => {
                  if (typeof ev.detail.value === 'string') {
                    searchTerm = ''
                    if (modelValue) {
                      modelValue.push(ev.detail.value)
                    }
                  }

                  if (filteredfields.length === 0) {
                    open = false
                  }
                }
              "
            >
              {{ framework.label }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </ComboboxPortal>
    </ComboboxRoot>
  </TagsInput>
</template>
