<script setup lang="ts">
import { type Task } from '@/types/api'
import { ref ,onMounted, watch} from 'vue'
import { useAuthStore } from '@/stores/authStore'
import axios from 'axios'

const tasks = ref<Task[]>([])

const authStore = useAuthStore()
const AddTask = ref(false)
const loadData = async () => {
  tasks.value = await getData()

}
  async function getData(): Promise<Task[]> {
  // Fetch data from your API here.
  const tasks = await axios
  .get(`/task/byUser/${authStore.userId}`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })
  const tasksInfo = tasks.data.data?.tasks.map((task: any) => {
    return {
      ...task
    }
  })
  return tasksInfo

}

console.log('tasks :', tasks.value)

const handleClickAdd = () => {
  AddTask.value = true
}
const handleClose = () => {
  AddTask.value = false
}
const needReload = ref(false)

const updatedTasks = () => {
  needReload.value = true
  console.log(needReload.value)
}

const reloaded = () => {
  needReload.value = false
}

onMounted(async () => {
  loadData()
})

watch(
  () => needReload.value,
  async (value) => {
    if (value) {
      loadData()
      reloaded()
    }
  }
)
</script>

<template>
   <Card class="flex-1">
    <CardHeader class="flex justify-between items-center">
      <div class="flex items-center">
        <Icon name="list_alt" class="text-6xl" />
        <span class="text-accent"> Tâches à effectuer </span>
      </div>
      
      <Button class="ml-5" variant="outline" @click="handleClickAdd"><Icon name="add" class="text-6xl" /></Button>

    </CardHeader>
    <CardContent><div class="flex flex-1 flex-col gap-1">
      <TaskAdd v-if="AddTask" @close="handleClose" ></TaskAdd>

      <Task :need-reload="needReload" 
        v-for="task in tasks"
        :key="task.taskId"
        :taskId="task.taskId"
        :userId="task.userId"
        :dueDate="task.dueDate"
        :description="task.description"
        :state="task.state"
        :issuerId="task.issuerId"
        @update:tasks="updatedTasks"
      >
      </Task>
    </div></CardContent></Card>
  <div class="gap-2">


    
  </div>
</template>
