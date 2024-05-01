<script setup lang="ts">
import { ref , watch, defineEmits} from 'vue'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import type { PropType } from 'vue'

const open = ref(false)
const value = ref('')

interface Option {
  value: string
  label: string
}

defineProps({
  comboboxLabel: {
    type: String,
    required: true
  },
  options: {
    type: Array as PropType<Option[]>,
    required: true
  }
})
const emits = defineEmits(['input'])
const test = ref('')

watch(value, (newValue) => {
  // Émettre un événement lorsque la valeur change
  test.value = newValue
  emits('input', newValue)

})
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button variant="outline" role="combobox" :aria-expanded="open" class="w-fit justify-between">
        {{ value ? options.find((option) => option.value === value)?.label : comboboxLabel }}

        <Icon name="expand_more" class="h-4 w-4" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-fit p-0">
      <Command v-model="value">
        <CommandInput placeholder="Rechercher" />
        <CommandEmpty>Aucun résultat</CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="option in options"
              :key="option.value"
              :value="option.value"
              @select="open = false"
              class="flex justify-between"
            >
              {{ option.label }}
              <Icon name="check" class="mr-2 h-4 w-4" v-if="value === option.value" />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>

</template>
