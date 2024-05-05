<template>
  <main class="flex flex-1 flex-col gap-6">
    <Wrapper class="w-full">
      <Card>
        <CardContent> </CardContent>
      </Card>
      <Card>
        <CardContent> </CardContent>
      </Card>
      <Card>
        <CardContent> </CardContent>
      </Card>
    </Wrapper>

    <div class="flex flex-col gap-3 md:flex-row">
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
      </Wrapper>

      <div class="flex h-fit flex-1 flex-col gap-3">
        <Wrapper class="flex-col">
          <Card>
            <CardHeader>
              <Icon name="notifications" />
              <span class="text-accent">Notifications</span>
            </CardHeader>
            <CardContent>
              <span class="text-muted-foreground">Vous êtes à jour</span>
            </CardContent>
          </Card>
        </Wrapper>
        <Wrapper class="flex-col gap-3">
          <Card>
            <CardHeader>
              <Icon name="pin_drop" />
              <span class="text-accent">Prochains évènements </span>
            </CardHeader>
            <CardContent>
              <div v-if="noEvents">
                <span class="text-muted-foreground">Aucun évènement à venir</span>
              </div>
              <div v-else>
                <EventCard />
              </div>
            </CardContent>
          </Card>
        </Wrapper>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { ref, onMounted } from 'vue'
import axios from 'axios'

import type { MaterialSymbol } from 'material-symbols'
import type { Event } from '@/types/api'

const user = useAuthStore()

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

import router from '@/router'

const goTo = (to: string) => {
  if (to.startsWith('http') || to.startsWith('www') || to.startsWith('https')) {
    window.location.href = to
  } else {
    router.push(to)
  }
}

const noEvents = ref(true)
const events = ref<Event[]>([])

async function getEvents(): Promise<Event[]> {
  const response = await axios.get(`/event`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })
  return response.data.data.events
}

const getNextFiveEvents = (events: Event[]): Event[] => {
  const todayDate = new Date().toISOString()
  return events.reduce((acc: Event[], event: Event) => {
    if (event.endDate > todayDate && acc.length < 5) {
      acc.push(event)
    }
    return acc
  }, [])
}

onMounted(async () => {
  events.value = await getEvents()
  events.value.sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime())
  events.value = getNextFiveEvents(events.value)
  noEvents.value = events.value.length == 0
})
</script>
