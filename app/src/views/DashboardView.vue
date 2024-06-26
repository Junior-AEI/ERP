<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

import { type IconNames } from '@/types'

import type { Event } from '@/types/api'

import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const user = useAuthStore()

type Link = {
  icon: IconNames
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
  {
    icon: 'person',
    name: 'Mon profil',
    to: '/profile'
  },
  {
    icon: 'cloud_upload',
    name: 'Uploader un document',
    to: '/documents'
  }
]

const noEvents = ref(true)
const events = ref<Event[]>([])

async function getEvents(): Promise<Event[]> {
  const response = await axios.get(`/event`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })
  console.log(response.data.data.events)
  return response.data.data.events
}

onMounted(async () => {
  events.value = await getEvents()
  events.value = events.value
    .filter((event) => event.endDate > new Date().toISOString())
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 5)

  noEvents.value = events.value.length == 0
})
</script>

<template>
  <main class="flex flex-1 flex-col gap-6">
    <!-- <Wrapper class="w-full">
      <Card>
        <CardContent> </CardContent>
      </Card>
      <Card>
        <CardContent> </CardContent>
      </Card>
      <Card>
        <CardContent> </CardContent>
      </Card>
    </Wrapper> -->

    <div class="flex flex-wrap gap-3">
      <Wrapper class="flex-2 flex-col">
        <h1 class="m-3 text-3xl text-accent">
          <RouterLink to="/profile">Bonjour {{ user.firstName }},</RouterLink>
        </h1>
        <Card>
          <CardHeader>
            <Icon name="star" />
            <span class="text-accent"> Liens favoris </span>
          </CardHeader>
          <CardContent class="flex-row flex-wrap">
            <Tile
              v-for="link in links"
              :key="link.name"
              :icon="link.icon"
              :name="link.name"
              :to="link.to"
            />
          </CardContent>
        </Card>
        <div class="flex flex-1 flex-row flex-wrap gap-2">
          <TasksCard class="flex flex-1 m-0"> </TasksCard>
        </div>
      </Wrapper>

      <div class="flex h-fit flex-1 flex-col gap-3 sm:min-w-72">
        <!-- <Wrapper class="flex-col">
          <Card>
            <CardHeader>
              <Icon name="notifications" />
              <span class="text-accent">Notifications</span>
            </CardHeader>
            <CardContent>
              <span class="text-muted-foreground">Vous êtes à jour</span>
            </CardContent>
          </Card>
        </Wrapper> -->
        <Wrapper>
          <ProjectProgressCard class="flex flex-1"> </ProjectProgressCard>

        </Wrapper>
        <Wrapper class="flex-col gap-3">
          <Card>
            <CardHeader class="flex flex-1 justify-between items-center">
              <div class="flex flex-1 gap-2 items-center">

                <Icon name="pin_drop" />
                <span class="text-accent">Prochains événements </span>
              </div>
              <Link class="p-2" to="/events" icon="read_more"> </Link>
            </CardHeader>
            <div class="max-h-96 overflow-y-auto"> 

            <CardContent>
              <div v-if="noEvents">
                <span class="text-muted-foreground">Aucun événement à venir</span>
              </div>
              <div class="flex flex-1 flex-col gap-2" v-else>
                <div v-for="event in events" :key="event.eventId">
                  <Card>
                    <CardContent>
                      <div class="flex flex-1 flex-col justify-start">
                        <h3>{{ event.name }}</h3>
                        <div class="flex flex-1 flex-row items-center justify-between">
                          <span> {{ event.eventTypeName }}</span>
                        </div>
                        <div class="flex flex-1 flex-row items-center justify-between">
                          <span>
                            {{
                              format(new Date(event.startDate), 'd MMMM yyyy à HH:mm', {
                                locale: fr
                              })
                            }}
                            -
                            {{
                              format(new Date(event.endDate), 'd MMMM yyyy à HH:mm', { locale: fr })
                            }}</span
                          >
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
           </div>
          </Card>
          
        </Wrapper>
      </div>
    </div>
  </main>
</template>
