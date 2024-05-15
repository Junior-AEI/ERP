<script setup lang="ts">
import { type Task } from '@/types/api'
import { ref ,onMounted, watch} from 'vue'
import { useAuthStore } from '@/stores/authStore'
import axios from 'axios'

const tasks = ref<Task[]>([])

const authStore = useAuthStore()
const AddTask = ref(false)


function delay(isoDateString: string): number {
    const currentDate = new Date().getTime(); // Convertir la date actuelle en timestamp UNIX
    const endDateTime = new Date(isoDateString).getTime();

    // Calcul de la différence en jours
    return Math.floor((endDateTime - currentDate) / (1000 * 60 * 60 * 24));
}

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

  tasksInfo.sort((taskA: any, taskB: any) => {
        // Récupérer les dates de fin de chaque projet
        const endDateA = new Date(taskA.dueDate);
        const endDateB = new Date(taskB.dueDate);
        // Calculer les délais en utilisant la fonction delay
        const delayA = delay(endDateA.toISOString());
        const delayB = delay(endDateB.toISOString());

        if (taskA.state === "Terminée"){
          if(taskB.state === "Terminée"){
            return delayB - delayA
          }
          return 1;
        }
        if(taskB.state === "Terminée"){

            return -1
          }

        // Comparer les délais et retourner le résultat de la comparaison
        return delayA - delayB;
    });


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

<div class="flex flex-col gap-2">
  <Wrapper class="flex h-full flex-1 flex-col gap-2">
        <Card class="flex h-full flex-1">
          <CardHeader class="flex flex-1 justify-between border-b-0">
            <div class="flex items-center gap-2">
        <Icon name="list_alt" class="text-6xl" />
        <span class="text-accent"> Tâches à effectuer </span>
      </div>
      
      <Button class="ml-5" variant="outline" @click="handleClickAdd"><Icon name="add" class="text-6xl" /></Button>
          </CardHeader>
          <TaskAdd v-if="AddTask" @close="handleClose" @update:tasks="updatedTasks"></TaskAdd>
          <div class="max-h-96"> <ScrollArea class="flex h-full flex-col gap-1">
        <CardContent class="h-full pr-3">
          <Task 
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
        </CardContent>
      </ScrollArea></div>
          

        </Card>

      </Wrapper>
  
  </div>
   
</template>
