<script setup lang="ts">
import { type Task } from "@/types/api"
import { ref } from "vue"
import { useAuthStore } from "@/stores/authStore";
import axios from "axios"

const tasks = ref<Task[]>([
  {
    id: 1,
    title: 'Tâche 001',
    deadline: new Date(),
    user: 1,
    concerned_user: 1,
    state: 'À faire'
  },
  {
    id: 2,
    title: 'Tâche 002',
    deadline: new Date(),
    user: 1,
    concerned_user: 1,
    state: 'À faire'
  },
  {
    id: 3,
    title: 'Tâche 003 : une tâche vraiment très longue qui prend beaucoup de plaaaaaace',
    deadline: new Date(),
    user: 1,
    concerned_user: 1,
    state: 'À faire'
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


</script>

<template>
  <div class="gap-2">
    <h3>Tâches à effectuer</h3>

    <!-- Afficher seulement les tasks qui sont "A faire", "En cours", ou "Terminé",   -->

    <div class="flex flex-1 flex-col gap-1">
      <Task
        v-for="task in tasks"
        :id="task.id"
        :title="task.title"
        :deadline="task.deadline"
        :user="task.user"
        :concerned_user="task.concerned_user"
        :state="task.state"
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
