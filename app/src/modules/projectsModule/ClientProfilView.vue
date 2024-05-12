<script setup lang="ts">
import ClientInfo from '@/components/clients/ClientInfo.vue';
import { useAuthStore } from '@/stores/authStore'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { ref, onMounted } from 'vue'

const authStore = useAuthStore()

const route = useRoute()

const personId = (() => {
  if (route.query.id && typeof route.query.id === 'string') {
    return parseInt(route.query.id)
  }
  return authStore.userId
})()
const name = route.query.name


async function getData(): Promise<{name: string[]}> {
  const projects = await axios.get(`/project`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const clientProjects = projects.data.data?.projects.filter((project: any) => project.clientId === personId);
  const Projectsname = clientProjects.map((project: any) => project.acronym);

  console.log(Projectsname)
  return Projectsname


  
}

const data = ref<{name: string[]}>()

onMounted(async () => {
  data.value = await getData()
})

</script>

<template>
  <div>
    <Wrapper class="gap-6">
      <Card class="p-3">
        <div class="flex flex-1 items-center justify-center text-6xl">
          <Icon name="work" />
        </div>
      </Card>
      <div>
        <div class="mt-4">
          <h3 class="text-3xl text-accent">{{ name }}</h3>
          <div class="flex flex-wrap gap-x-3">
            <div class="mt-2 p-2 text-sm">Etudes : </div>
            <template v-for="projectName in data" :key="projectName">
              <Elevated class="mt-2 p-2 text-sm">
                <div class="flex items-center justify-between">
                  <span>{{ projectName }}</span> <!-- Utiliser le nom du projet à la place de "Vice-Trésorier 2023-2024" -->
                </div>
              </Elevated>
            </template>
          </div>
        </div>
      </div>
    </Wrapper>
    <div class="flex items-start gap-4">
      <div class="flex flex-col gap-2">
        <ClientInfo v-if="personId" :clientId="personId" />
        </div>

    </div>
  </div>
</template>


