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
        <h1 class="m-3 text-accent">Bonjour {{ user.firstName }},</h1>
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
              <span class="text-muted-foreground">Aucun évènement à venir</span>
            </CardContent>
          </Card>
        </Wrapper>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'

const user = useAuthStore()
</script>
