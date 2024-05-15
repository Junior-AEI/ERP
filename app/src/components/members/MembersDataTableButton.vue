// DataTableDropDown.vue
<script setup lang="ts">
defineProps<{
  item: {
    memberId: number
    firstname: string
    lastname: string
  }
}>()

import router from '@/router'

function goToProfile(id: number, firstname: string, lastname: string) {
  router.push({ path: '/profile', query: { id: id.toString(), firstname, lastname } })
}
</script>

<template>
  <Button variant="outline" @click="goToProfile(item.memberId, item.firstname, item.lastname)">
    <span class="sr-only">Plus</span>
    Infos +
  </Button>
</template>
