<script lang="ts" setup>
import { type HTMLAttributes, computed, ref } from 'vue'
import {
  CalendarRoot,
  type CalendarRootEmits,
  type CalendarRootProps,
  useForwardPropsEmits
} from 'radix-vue'
import {
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarHeader,
  CalendarHeading,
  CalendarNextButton,
  CalendarPrevButton
} from '.'
import { cn } from '@/lib/utils'

const props = defineProps<CalendarRootProps & { class?: HTMLAttributes['class'] }>()

const emits = defineEmits<CalendarRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const [propsMonth, propsYear] = (() => {
  if (delegatedProps.value.modelValue && !Array.isArray(delegatedProps.value.modelValue)) {
    return [delegatedProps.value.modelValue.month + 1, delegatedProps.value.modelValue.year]
  }
  return [new Date().getMonth() + 1, new Date().getFullYear()]
})()

const currentMonth = ref(propsMonth)

const currentYear = ref(propsYear)

const changeYear = ref(false)

const ClickNextButton = () => {
  if (!changeYear.value) {
    if (currentMonth.value === 12) {
      currentMonth.value = 1
      currentYear.value++
    } else {
      currentMonth.value++
    }
    return
  } else {
    currentYear.value++
  }
}

const ClickPrevButton = () => {
  if (!changeYear.value) {
    if (currentMonth.value === 1) {
      currentMonth.value = 12
      currentYear.value--
    } else {
      currentMonth.value--
    }
    return
  } else {
    currentYear.value--
  }
}

const togleChangeYear = () => {
  changeYear.value = !changeYear.value
}

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <CalendarRoot v-slot="{ grid, weekDays }" :class="cn('p-3', props.class)" v-bind="forwarded">
    <CalendarHeader>
      <CalendarPrevButton :step="changeYear ? 'year' : 'month'" @click="ClickPrevButton" />
      <CalendarHeading
        :month="currentMonth"
        :year="currentYear"
        :yearMode="changeYear"
        class="cursor-pointer"
        @click="togleChangeYear"
      />
      <CalendarNextButton :step="changeYear ? 'year' : 'month'" @click="ClickNextButton" />
    </CalendarHeader>

    <div class="mt-4 flex flex-col gap-y-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
      <CalendarGrid v-for="month in grid" :key="month.value.toString()">
        <CalendarGridHead>
          <CalendarGridRow>
            <CalendarHeadCell v-for="day in weekDays" :key="day">
              {{ day }}
            </CalendarHeadCell>
          </CalendarGridRow>
        </CalendarGridHead>
        <CalendarGridBody>
          <CalendarGridRow
            v-for="(weekDates, index) in month.rows"
            :key="`weekDate-${index}`"
            class="mt-2 w-full"
          >
            <CalendarCell v-for="weekDate in weekDates" :key="weekDate.toString()" :date="weekDate">
              <CalendarCellTrigger :day="weekDate" :month="month.value" />
            </CalendarCell>
          </CalendarGridRow>
        </CalendarGridBody>
      </CalendarGrid>
    </div>
  </CalendarRoot>
</template>
