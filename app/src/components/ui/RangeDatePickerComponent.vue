<script setup lang="ts">
import { DateFormatter, getLocalTimeZone } from '@internationalized/date'

import type { DateRange } from 'radix-vue'
import { RangeCalendar } from '@/components/ui/range-calendar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const df = new DateFormatter('fr-FR', {
  dateStyle: 'medium'
})

const value = defineModel<DateRange>()
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="cn('justify-start text-left font-normal', !value && 'text-muted-foreground')"
      >
        <Icon name="date_range" class="mr-2 h-4 w-4" />
        <template v-if="value">
          <template v-if="value.start">
            <template v-if="value.end">
              {{ df.format(value.start.toDate(getLocalTimeZone())) }} -
              {{ df.format(value.end.toDate(getLocalTimeZone())) }}
            </template>

            <template v-else>
              {{ df.format(value.start.toDate(getLocalTimeZone())) }}
            </template>
          </template>
          <template v-else> Choisir une date </template>
        </template>
        <template v-else> Choisir une date </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <RangeCalendar
        v-model="value"
        initial-focus
        :number-of-months="2"
        @update:start-value="(startDate) => (value ? (value.start = startDate) : '')"
      />
    </PopoverContent>
  </Popover>
</template>
