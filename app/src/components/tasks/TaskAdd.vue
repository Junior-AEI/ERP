<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { type UserInGroup, type Group } from '@/types/api'

import { type Field } from '../tagsSelector'
import { useAuthStore } from '@/stores/authStore'

const placeholder = 'Attribuer à'
const groupusers = ref<Field[]>([
  { label: 'test', value: 'test' },
  { label: 'test2', value: 'test2' }
])

axios.get('/group').then((response) => {
  console.log(response)
  groupusers.value.push(
    ...response.data.data.groups.map((group: Group) => {
      return { value: group.groupName, label: group.groupName }
    })
  )
})

const selectedUsers = ref<string[]>([])

const description = ref<string>('')
type DateString = string

const dueDate = ref<DateString>('')

const data = ref<UserInGroup[]>([])

async function getData(): Promise<UserInGroup[]> {
  // Fetch data from your API here.

  const belongers = await axios.get(`/belonger`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const groups = await axios.get(`/group`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })
  const UserByGroup = groups.data.data?.groups.map((group: any) => {
    const belonger = belongers.data.data?.belongers.find(
      (belonger: any) => belonger.groupName === group.groupName
    )
    return {
      ...group,
      ...belonger
    }
  })

  return UserByGroup
}

onMounted(async () => {
  data.value = await getData()
})

function addTask() {
  for (const belonger of data.value) {
    for (const group of selectedUsers.value) {
      if (belonger.groupName === group) {
        axios.post(`/task/`, {
          task: {
            description: description.value,
            dueDate: dueDate.value,
            userId: belonger.userId,
            issuerId: useAuthStore().userId
          }
        })
      }
    }
  }
}
</script>

<template>
  <div class="flex flex-1 flex-col gap-1">
    <h3>Ajouter une tâche :</h3>
    <div class="flex flex-col gap-1">
      <Input type="text" placeholder="ma tâche" v-model="description" />
      <Input type="date" placeholder="dueDate" v-model="dueDate" />
      <div class="flex flex-1 flex-row items-center gap-1">
        <TagsSelector
          :fields="groupusers"
          :placeholder="placeholder"
          v-model="selectedUsers"
        ></TagsSelector>

        <Button variant="outline" @click="addTask">Ajouter</Button>
      </div>
    </div>
  </div>
</template>
