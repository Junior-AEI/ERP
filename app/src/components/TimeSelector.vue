<template>
  <div class="flex items-center gap-2">
    <Select v-model="timeModel.hour">
      <SelectTrigger>
        <SelectValue :placeholder="timeModel.hour" class="min-w-6" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</SelectItem>
      </SelectContent>
    </Select>
    <span class="text-lg font-semibold text-muted-foreground">:</span>
    <Select v-model="timeModel.minute">
      <SelectTrigger>
        <SelectValue :placeholder="timeModel.minute" class="min-w-6" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem v-for="minute in minutes" :key="minute" :value="minute">{{
          minute
        }}</SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>

<script setup lang="ts">
import { type TimeValue } from '@/types/api'

const timeModel = defineModel<TimeValue>({
  required: true
})

const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))
const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'))
</script>
