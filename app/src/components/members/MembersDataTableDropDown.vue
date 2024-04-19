// DataTableDropDown.vue
<script setup lang="ts">
defineProps<{
  item: {
    memberId: string
  }
}>()

import router from '@/router'

function goToProfile(id: string) {
  console.log('Go to profile', id)
  router.push({ name: 'members.show', params: { id } })
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="h-8 w-8 p-0">
        <span class="sr-only">Plus</span>
        <Icon name="more_horiz" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="goToProfile(item.memberId)">
        Détails sur l'utilisateur
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
