// DataTableDropDown.vue
<script setup lang="ts">

import axios from 'axios'
import type { ExpenseAccount } from '@/types/api'
import { useAuthStore } from '@/stores/authStore'


defineProps<{
  item: {
    expenseId: number,
    userId: number,
  description: string,
  approbatorId: number,
  state: string,
  reason : string,
  expenseDate: string,
  }
}>()


function modifyExpenseAccountState(item : ExpenseAccount, state:string) {
  axios
    .put(
      `/expenseAccount/${item.expenseId}`,
      {
        expenseAccount: {
          expenseId: item.expenseId,
          userId: item.userId,
          reason: item.reason,
          approbatorId: item.approbatorId,
          description: item.description,
          state:state,
          expenseDate : item.expenseDate
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

      <DropdownMenuItem v-if="item.state != 'A Traiter'" @click="modifyExpenseAccountState(item, 'A Traiter')">
        A Traiter
      </DropdownMenuItem>
      <DropdownMenuItem v-if="item.state != 'En cours'" @click="modifyExpenseAccountState(item, 'En cours')">
        En cours
      </DropdownMenuItem>
      <DropdownMenuItem  v-if="item.state != 'Traitée'" @click="modifyExpenseAccountState( item,'Traitée')">
        Traitée
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
