<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import type { FullInfoForProfil } from '@/types/api'

const authStore = useAuthStore()

const route = useRoute()

const personId = (() => {
  if (route.query.id && typeof route.query.id === 'string') {
    return parseInt(route.query.id)
  }
  return authStore.userId
})()
const fistname = route.query.fistname ?? authStore.firstName
const lastname = route.query.lastname ?? authStore.lastName

async function getData(): Promise<FullInfoForProfil> {


  const member = await axios.get(`/member/${personId}`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const person = await axios.get(`/person/${personId}`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const users = await axios.get(`/user`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })
  const memberInfo = member.data.data.member;
  const personInfo = person.data.data.person;
  const usersInfo = users.data.data.users;

  const isMemberInUser = usersInfo.some((user: any) => user.userId === memberInfo.memberId);
  const userInfo = isMemberInUser ? usersInfo.find((user: any) => user.userId === memberInfo.memberId) : null;
  const belongers = await axios.get(`/belonger`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const groups = await axios.get(`/group`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })
  const UserByGroup = groups.data.data?.groups.map((group: any) => {
    const belonger = belongers.data.data?.belongers.find(
      (belonger: any) => belonger.groupId === group.groupId
    )
    return {
      ...group,
      ...belonger
    }
  })

  const groupsUser = UserByGroup.filter(
      (group: any) => group.userId === personId
    )


  return{ ...memberInfo, ...userInfo, isUser : isMemberInUser, Groups : groupsUser }
}

const data = ref<FullInfoForProfil>()

onMounted(async () => {
  data.value = await getData()
})

function YearfromDate(isoDateString: string): string {
  const dateObject = new Date(isoDateString)

  // Check if the date object is valid
  if (isNaN(dateObject.getTime())) {
    throw new Error('Invalid date string')
  }

  // Extract year, month, and day from the date object
  const year = dateObject.getFullYear()
  // Create and return a new CalendarDate object
  return year.toString()
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
          <h3 class="text-3xl text-accent">{{ fistname }} {{ lastname }}</h3>
          <div v-if="data">
          <div class="flex flex-wrap gap-x-3" v-if="data.isUser">
            <div class="mt-2 p-2 text-sm">Mandat :</div>
            <Elevated class="mt-2 p-2 text-sm">
              <div class="flex items-center justify-between">
                <Icon name="work" class="mr-2" />
                <span v-if="data"> {{YearfromDate(data.mandateStart)}} - {{YearfromDate(data.mandateEnd)}}</span>
              </div>
            </Elevated>
            <div class="mt-2 p-2 text-sm">Groupes :</div>
            <template v-for="group in data.Groups" :key="Groups">
              <Elevated class="mt-2 p-2 text-sm">
                <div class="flex items-center justify-between">
                  <span>{{ group.groupName }}</span>
                  <!-- Utiliser le nom du projet à la place de "Vice-Trésorier 2023-2024" -->
                </div>
              </Elevated>
            </template>
          </div>
          <div class="flex flex-wrap gap-x-3" v-else>
            <Elevated class="mt-2 p-2 text-sm">
              <div class="flex items-center justify-between">
                <Icon name="person" class="mr-2" />
                <span>Cotisant</span>
              </div>
            </Elevated>
          </div>
        </div>
        </div>
      </div>
    </Wrapper>
    <Tabs default-value="userInfo" v-auto-animate>
      <TabsList>
        <TabsTrigger value="userInfo" v-auto-animate class="gap-2">
          <Icon name="lock" class="text-6xl" />
          Informations
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
