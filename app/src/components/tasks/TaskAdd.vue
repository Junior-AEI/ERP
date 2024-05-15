<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { type UserInGroup, type Group } from '@/types/api'

import { type Field } from '../tagsSelector'
import { useAuthStore } from '@/stores/authStore'
import { useToast } from '@/components/ui/toast/use-toast'

const placeholder = 'Attribuer à'
const groupusers = ref<Field[]>([])

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
      (belonger: any) => belonger.groupId === group.groupId
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
const { toast } = useToast()

function addTask() {
  for (const belonger of data.value) {
    for (const group of selectedUsers.value) {
      if (belonger.groupName === group) {
        console.log(belonger)
        console.log(belonger.userId)

        axios.post(`/task/`, {
          task: {
            description: description.value,
            dueDate: dueDate.value,
            userId: belonger.userId,
            issuerId: useAuthStore().userId
          }
        })
        .then(() => {
          description.value = "",
          dueDate.value = "",
          selectedUsers.value = [],
          emit('close')
          emit('update:tasks')
        toast({
        title: 'Tache ajouté',
        description: `Notification envoyé`
      })
    })
      }
    }
  }
}
const emit = defineEmits([ 'close','update:tasks'])

</script>

<template>
  <Card class="flex-1">
    <CardHeader class="flex justify-between items-center">
      <div class="flex items-center">
        <Icon name="add_circle" class="text-6xl" />
        <span class="text-accent"> Ajouter une tâche </span>
      </div>

      <Button class="ml-5"  @click="emit('close')" > <Icon name="close" class="text-6xl" /></Button>

    </CardHeader>
    <CardContent><div class="flex flex-col gap-2">
      <Label>Intitulé de la Tache : </Label>
      <Input type="text" placeholder="Faire du rangement dans le Drive" v-model="description" />

      <div class="flex flex-row items-center gap-2">
        <Label>Deadline:</Label>

        <Input type="date" placeholder="dueDate" v-model="dueDate" />
      </div>
      <Label>Assigné à/au groupe:</Label>

      <div class="flex flex-1 flex-row items-center gap-1">
        
        <TagsSelector
          :fields="groupusers"
          :placeholder="placeholder"
          v-model="selectedUsers"
        ></TagsSelector>

      </div>
      <Button variant="outline" @click="addTask">Ajouter</Button>

    </div></CardContent></Card>
  <div class="flex flex-1 flex-col gap-1">
    <h3></h3>
    
  </div>
</template>
