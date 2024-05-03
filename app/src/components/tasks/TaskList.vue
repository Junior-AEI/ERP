<script setup lang="ts">
import { type Task } from "@/types/api"
import { ref } from "vue"
import { useAuthStore } from "@/stores/authStore";
import axios from "axios"

const tasks = ref<Task[]>([
  {
    taskId: 1,
    userId: 1,
    dueDate: new Date().toISOString(),
    description: 'Tâche 001',
    state: 'À faire',
    issuerId: 1    
  },
  {
    taskId: 2,
    userId: 1,
    dueDate: new Date().toISOString(),
    description: 'Tâche 002',
    state: 'À faire',
    issuerId: 1    
  },
  {
    
    taskId: 1,
    userId: 1,
    dueDate: new Date().toISOString(),
    description: 'Tâche 003 : une tâche vraiment très longue qui prend beaucoup de plaaaaaace',
    state: 'À faire',
    issuerId: 1    
  }
])

const authStore = useAuthStore() 

axios.get(`/task/byUser/${authStore.userId}`, {
        headers: {
          Authorization: `Bearer ${useAuthStore().token}`
        }
      }).then((response)=>{
    tasks.value.push(...response.data.data.tasks)
    console.log(tasks.value);
    
 })
 console.log("tasks :",tasks.value);
 


</script>

<template>
  <div class="gap-2">
    <h3>Tâches à effectuer</h3>

    <!-- Afficher seulement les tasks qui sont "A faire", "En cours", ou "Terminé",   -->

    <div class="flex flex-1 flex-col gap-1">
      <Task
        v-for="task in tasks"
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

<!-- <Tile
              v-for="link in links"
              :key="link.name"
              :icon="link.icon"
              :name="link.name"
              :to="link.to"
            /> 

            type Link = {
                icon: MaterialSymbol
                name: string
                to: string
              }
              
              const links: Link[] = [
                {
                  icon: 'mail',
                  name: 'Webmail',
                  to: 'https://www.ovhcloud.com/fr/mail/'
                },
                {
                  icon: 'local_library',
                  name: 'Wiki',
                  to: 'https://wikix.junior-aei.com/'
                },
                {
                  icon: 'lock',
                  name: 'Passbolt',
                  to: 'https://passwords.junior-aei.com/'
                },
                {
                  icon: 'person',
                  name: 'Kiwi',
                  to: 'https://kiwix.junior-entreprises.com/'
                },
                /*   {
                  icon: 'cloud_upload',
                  name: 'Uploader un document',
                  to: '/upload'
                }, */
                {
                  icon: 'person',
                  name: 'Mon profil',
                  to: '/profile'
                },
                {
                  icon: 'cloud_upload',
                  name: 'Uploader un document',
                  to: '/'
                }
              ]
               -->
