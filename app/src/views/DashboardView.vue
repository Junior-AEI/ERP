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
        <h1 class="m-3 text-accent">Bonjour {{ user.prenom }},</h1>
        <Card>
          <CardHeader>
            <Icon name="star" />
            <span class="text-accent"> Liens favoris </span>
          </CardHeader>
          <CardContent>
            <Button variant="outline"> Coucou </Button>
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
              <Button> Coucou </Button>
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
              <Button>Coucou </Button>
            </CardContent>
          </Card>
        </Wrapper>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const user = ref({
  prenom: '',
  nom: ''
})

axios
  .get(`/utilisateur/${authStore.user_id}`)
  .then((response) => {
    console.log(response.data)
    user.value.nom = response.data.adherent.nom
    user.value.prenom = response.data.adherent.prenom
  })
  .catch((error) => {
    console.log(error)
  })
</script>
