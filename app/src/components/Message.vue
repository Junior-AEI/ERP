<template>
  <Card class="flex-row items-center justify-between gap-3 px-3 py-2">
    <div class="flex flex-row items-center gap-3">
      <Icon name="chat" />
      <div class="flex flex-col">
        <span class="">{{ title }}</span>
        <span class="text-xs text-muted-foreground">par {{ user }}, {{ day }} à {{ hour }}</span>
      </div>
    </div>
    <Badge variant="outline" class="text-sm">Nouveau</Badge>
  </Card>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  user: {
    type: String,
    required: true
  }
})

const day = (() => {
  if (props.date.getDate() === new Date().getDate()) {
    return "aujourd'hui"
  } else if (props.date.getDate() === new Date().getDate() - 1) {
    return 'hier'
  }

  console.log(props.date.getTimezoneOffset())

  return `Le ${props.date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })}`
})()

const hour = props.date.toLocaleDateString('fr-FR', {
  hour: 'numeric',
  minute: 'numeric'
})
</script>
