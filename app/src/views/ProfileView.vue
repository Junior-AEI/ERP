<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useRoute } from 'vue-router'

let personId: number | undefined = undefined
const authStore = useAuthStore()

const route = useRoute()

if (route.params.id) {
  console.log('ID:', route.params.id)

  if (typeof route.params.id === 'string') {
    personId = parseInt(route.params.id)
  }
} else {
  personId = authStore.userId
}
</script>

<template>
  <div>
    <Wrapper class="gap-6">
      <Card class="p-3">
        <div class="flex flex-1 items-center justify-center text-6xl">
          <Icon name="person" />
        </div>
      </Card>
      <div>
        <div class="mt-4">
          <h3 class="text-3xl text-accent">{{ authStore.firstName }} {{ authStore.lastName }}</h3>
          <div class="flex flex-wrap gap-x-3">
            <Elevated class="mt-2 p-2 text-sm">
              <div class="flex items-center justify-between">
                <Icon name="work" class="mr-2" />
                <span> Vice-Trésorier 2023-2024</span>
              </div>
            </Elevated>
            <Elevated class="mt-2 p-2 text-sm">
              <div class="flex items-center justify-between">
                <Icon name="person" class="mr-2" />
                <span>Intervenant</span>
              </div>
            </Elevated>
          </div>
        </div>
      </div>
    </Wrapper>
    <Tabs default-value="userInfo" v-auto-animate>
      <TabsList>
        <TabsTrigger value="userInfo" v-auto-animate class="gap-2">
          <Icon name="lock" class="text-6xl" />
          Mettre à jour les informations
        </TabsTrigger>
        <TabsTrigger value="documents" v-auto-animate class="gap-2">
          <Icon name="description" class="text-6xl" />
          Documents liés
        </TabsTrigger>
        <TabsTrigger value="manageAccount" v-auto-animate class="gap-2">
          <Icon name="settings" class="text-6xl" />
          Gérer le compte
        </TabsTrigger>
        <TabsTrigger value="role" v-auto-animate class="gap-2">
          <Icon name="shield" class="text-6xl" />
          Rôles et permissions
        </TabsTrigger>
      </TabsList>
      <TabsContent value="userInfo" v-auto-animate class="flex gap-2">
        <ProfileInfo v-if="personId" :personId="personId" />
      </TabsContent>
      <TabsContent value="documents" v-auto-animate>
        <UserDocuments />
      </TabsContent>
      <TabsContent value="manageAccount" v-auto-animate>
        <UserManagement />
      </TabsContent>
      <TabsContent value="role" v-auto-animate>
        <UserRoles />
      </TabsContent>
    </Tabs>
  </div>
</template>
