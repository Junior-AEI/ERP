<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { columns } from './columns'
import type { FullMember } from '@/types/api'
import axios from 'axios'
import { useRouter } from 'vue-router'

const data = ref<FullMember[]>([])
import { useAuthStore } from '@/stores/authStore'

async function getData(): Promise<FullMember[]> {
  // Fetch data from your API here.

  const members = await axios.get(`/member`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const persons = await axios.get(`/person`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const fullMembers = members.data.data?.members.map((member: any) => {
    const person = persons.data.data?.persons.find(
      (person: any) => person.personId === member.memberId
    )
    return {
      ...member,
      ...person
    }
  })

  return fullMembers
}

onMounted(async () => {
  data.value = await getData()
})

const router = useRouter()

const handleClick = (row: any) => {
  router.push({
    path: '/profile',
    query: { id: row.memberId, fistname: row.firstname, lastname: row.lastname }
  })
}
</script>

<template>
  <div>
    <DataTable :columns="columns" :data="data" @click:row="handleClick" />
  </div>
</template>
