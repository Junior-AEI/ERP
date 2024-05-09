// DataTableDropDown.vue
<script setup lang="ts">
defineProps<{
  item: {
    memberId: number
  }
}>()

import router from '@/router'

function goToProfile(id: number) {
  console.log('Go to profile', id)
  router.push({ path: `/profile/${id}` })
}
</script>

<template>
   <Button variant="outline" @click="goToProfile(item.memberId)">
        <span class="sr-only">Plus</span>
        Infos +
      </Button>
</template>
