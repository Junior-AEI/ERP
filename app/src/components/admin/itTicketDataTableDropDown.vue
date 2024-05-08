// DataTableDropDown.vue
<script setup lang="ts">
import axios from 'axios'
import type { itTicket } from '@/types/api'
import { useAuthStore } from '@/stores/authStore'

defineProps<{
  item: {
    ticketId: number
    userId: number
    title: string
    description: string
    applicationConcerned: string
    state: string
    createdAt: string
  }
}>()

function modifyItTicketState(item: itTicket, state: string) {
  axios
    .put(
      `/itTicket/${item.ticketId}`,
      {
        itTicket: {
          ticketId: item.ticketId,
          userId: item.userId,
          title: item.title,
          applicationConcerned: item.applicationConcerned,
          description: item.description,
          state: state
        }
      },
      {
        headers: {
          Authorization: `Bearer ${useAuthStore().token}`
        }
      }
    )
    .then((response) => {
      console.log(response)
      location.reload()
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="h-8 w-8 p-0">
        <span class="sr-only">Plus</span>
        <Icon name="expand_more" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem
        v-if="item.state != 'A faire'"
        @click="modifyItTicketState(item, 'A faire')"
      >
        A faire
      </DropdownMenuItem>
      <DropdownMenuItem
        v-if="item.state != 'En cours'"
        @click="modifyItTicketState(item, 'En cours')"
      >
        En cours
      </DropdownMenuItem>
      <DropdownMenuItem v-if="item.state != 'Clos'" @click="modifyItTicketState(item, 'Clos')">
        Clos
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
