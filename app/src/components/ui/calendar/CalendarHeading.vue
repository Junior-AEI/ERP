<script lang="ts" setup>
const props = defineProps<{
  month: number
  year: number
  yearMode: boolean
}>()

console.log(props.month)
</script>

<template>
  <div>
    <span class="text-center text-lg font-semibold" v-if="!yearMode">
      {{
        new Date(props.year, props.month - 1).toLocaleString('default', {
          month: 'long',
          year: 'numeric'
        })
      }}
    </span>
    <span class="text-center text-lg font-semibold" v-else>
      {{ props.year }}
    </span>
  </div>
</template>
