<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { columns } from './columns'
import type { ExpenseAccountWithDoc } from '@/types/api'
import axios from 'axios'

const data = ref<ExpenseAccountWithDoc[]>([])
import { useAuthStore } from '@/stores/authStore'
function delay(isoDateString: string): number {
    const currentDate = new Date().getTime(); // Convertir la date actuelle en timestamp UNIX
    const endDateTime = new Date(isoDateString).getTime();

    // Calcul de la différence en jours
    return Math.floor((endDateTime - currentDate) / (1000 * 60 * 60 * 24));
}

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

  ExpenseAccounts.data.data?.accountExpenses.sort((expenseA: any, expenseB: any) => {
        // Récupérer les dates de fin de chaque projet
        const endDateA = new Date(expenseA.expenseDate);
        const endDateB = new Date(expenseB.expenseDate);
        // Calculer les délais en utilisant la fonction delay
        const delayA = delay(endDateA.toISOString());
        const delayB = delay(endDateB.toISOString());

        if (expenseA.state === "Traitée"){
          if(expenseB.state === "Traitée"){
            return delayB - delayA
          }
          return 1;
        }
        if(expenseB.state === "Traitée"){

            return -1
          }

        // Comparer les délais et retourner le résultat de la comparaison
        return delayA - delayB;
    });
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
