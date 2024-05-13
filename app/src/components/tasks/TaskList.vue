<script setup lang="ts">
import { type Task } from '@/types/api'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import axios from 'axios'

const tasks = ref<Task[]>([])

const authStore = useAuthStore()

axios
  .get(`/task/byUser/${authStore.userId}`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })
  .then((response) => {
    tasks.value.push(...response.data.data.tasks)
    console.log(tasks.value)
  })
console.log('tasks :', tasks.value)
</script>

<template>
  <div class="gap-2">
    <h3>Tâches à effectuer</h3>

    <!-- Afficher seulement les tasks qui sont "A faire", "En cours", ou "Terminé",   -->

    <div class="flex flex-1 flex-col gap-1">
      <Task
        v-for="task in tasks"
        :key="task.taskId"
        :taskId="task.taskId"
        :userId="task.userId"
        :dueDate="task.dueDate"
        :description="task.description"
        :state="task.state"
        :issuerId="task.issuerId"
      >
      </Task>
    </div>
  </div>
</template>
