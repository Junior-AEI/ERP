<script setup lang="ts">
import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date'

import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const df = new DateFormatter('fr-FR', {
  dateStyle: 'long'
})

const props = defineProps<{
  disabled?: boolean
  class?: string
}>()

const value = defineModel<DateValue>()
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :disabled="disabled"
        :class="
          cn('justify-start text-left font-normal', props.class, !value && 'text-muted-foreground')
        "
      >
        <Icon name="date_range" class="mr-2 h-4 w-4" />
        {{ value ? df.format(value.toDate(getLocalTimeZone())) : 'Choisir une date' }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="value" initial-value="2024-01-01" />
    </PopoverContent>
  </Popover>
</template>
