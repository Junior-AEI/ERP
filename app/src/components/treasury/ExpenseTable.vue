<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { columns } from './columns'
import type { ExpenseAccountInfo } from '@/types/api'
import axios from 'axios'

const data = ref<ExpenseAccountInfo[]>([])
import { useAuthStore } from '@/stores/authStore'

async function getData(): Promise<ExpenseAccountInfo[]> {
  // Fetch data from your API here.

  const ExpenseAccounts = await axios.get(`/expenseAccount`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const persons = await axios.get(`/person`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const ExpenseAccountsAll = ExpenseAccounts.data.data?.accountExpenses.map((ExpenseAccount: any) => {
    const aprob = persons.data.data?.persons.find((person: any) => person.personId === ExpenseAccount.approbatorId)
    const demandeur = persons.data.data?.persons.find((person: any) => person.personId === ExpenseAccount.userId)

    return {
      ...ExpenseAccount,
      usernameUser: `${demandeur.firstname} ${demandeur.lastname}`,
      usernameApprobator: `${aprob.firstname} ${aprob.lastname}`
    }
  })

  return ExpenseAccountsAll 
}

onMounted(async () => {
  data.value = await getData()
})

const handleClick = (e: any) => {
  console.log('Clicked on row:', e.target)
}
</script>

<template>
  
  <div>
    <DataTable :columns="columns" :data="data" :onClickFn="handleClick"/>
  </div>
</template>
