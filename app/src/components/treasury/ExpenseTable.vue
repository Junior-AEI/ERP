<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { columns } from './columns'
import type { ExpenseAccountWithDoc } from '@/types/api'
import axios from 'axios'

const data = ref<ExpenseAccountWithDoc[]>([])
import { useAuthStore } from '@/stores/authStore'

async function getData(): Promise<ExpenseAccountWithDoc[]> {
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

  const docTypes = await axios.get(`/documentType`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })
  const typeDoc = docTypes.data.data.documentTypes.find(
    (documentType: any) => documentType.type === "Doc lié à une Demande de Note de Frais"
  )
  console.log(typeDoc)

  const documents = await axios.get(`/document`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })
  console.log(typeDoc.typeId)
  console.log(documents.data.data.documents)
  const DocExpenseAccount = documents.data.data.documents.filter(
    (document: any) => document.typeId == typeDoc.typeId
  )
  console.log(DocExpenseAccount)

  const ExpenseAccountsAll = ExpenseAccounts.data.data?.accountExpenses.map(
    (ExpenseAccount: any) => {
      const aprob = persons.data.data?.persons.find(
        (person: any) => person.personId === ExpenseAccount.approbatorId
      )
      const demandeur = persons.data.data?.persons.find(
        (person: any) => person.personId === ExpenseAccount.userId
      )
      const DocList = DocExpenseAccount.filter(
        (document: any) => document.information === ExpenseAccount.expenseId.toString()
      )

      return {
        ...ExpenseAccount,
        usernameUser: `${demandeur.firstname} ${demandeur.lastname}`,
        usernameApprobator: `${aprob.firstname} ${aprob.lastname}`,
        documentList: DocList
      }
    }
  )

  return ExpenseAccountsAll
}

onMounted(async () => {
  data.value = await getData()
})

</script>

<template>
  <div>
    <DataTable :columns="columns" :data="data"  />
  </div>
</template>
