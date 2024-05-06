<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import type { MaterialSymbol } from 'material-symbols'

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
</script>

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
                            {{ format(new Date(event.startDate), 'd MMMM yyyy', { locale: fr }) }} -
                            {{
                              format(new Date(event.endDate), 'd MMMM yyyy', { locale: fr })
                            }}</span
                          >
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </Wrapper>
      </div>
    </div>
  </main>
</template>
