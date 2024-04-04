<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { columns } from './columns'
import type { Member } from '@/types/api'

const data = ref<Member[]>([])

async function getData(): Promise<Member[]> {
  // Fetch data from your API here.
  return [
    {
      personId: '1',
      memberId: '1',
      firstname: 'Jean',
      lastname: 'Dupont',
      gender: 'Homme',
      mobilePhoneNumber: '0123456789',
      landlinePhoneNumber: '9876543210',
      email: 'jean.dupont@example.com',
      birthDate: '1990-01-01',
      nationality: 'Française',
      promotion: '2020',
      contributionDate: '2022-03-20',
      paymentMethod: 'Carte bancaire',
      department: 'Telecom',
      telegramId: '@jeandup',
      createdAt: '2022-03-20',
      updatedAt: '2024-03-20'
    },
    {
      personId: '2',
      memberId: '2',
      firstname: 'Marie',
      lastname: 'Dubois',
      gender: 'Femme',
      mobilePhoneNumber: '0612345678',
      landlinePhoneNumber: '0187654321',
      email: 'marie.dubois@example.com',
      birthDate: '1985-05-10',
      nationality: 'Française',
      promotion: '2018',
      contributionDate: '2023-01-15',
      paymentMethod: 'Virement bancaire',
      department: 'Info',
      telegramId: '@mariedub',
      createdAt: '2023-01-15',
      updatedAt: '2024-03-20'
    },
    {
      personId: '3',
      memberId: '3',
      firstname: 'Éric',
      lastname: 'Kerhervé',
      gender: 'Homme',
      mobilePhoneNumber: '0612345678',
      landlinePhoneNumber: '0187654321',
      email: 'eric.kerherve.bordeaux-inp.fr',
      birthDate: '1985-05-10',
      nationality: 'Française',
      promotion: '2018',
      contributionDate: '2023-01-15',
      paymentMethod: 'Virement bancaire',
      department: 'Élec',
      telegramId: '@mariedub',
      createdAt: '2023-01-15',
      updatedAt: '2024-03-20'
    }
  ]
}

onMounted(async () => {
  data.value = await getData()
})
</script>

<template>
  <div>
    <DataTable :columns="columns" :data="data" />
  </div>
</template>
