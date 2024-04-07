<template>
  <Wrapper class="max-w-2xl">
    <Card class="flex-1">
      <CardHeader>
        <Icon name="lock" class="text-6xl" />
        <span class="text-accent"> Informations publiques </span>
      </CardHeader>
      <CardContent>
        <div class="flex gap-4">
          <div class="flex flex-1 flex-col gap-2">
            <Label for="lastname">Nom</Label>
            <Input id="lastname" v-model="userInfo.lastname" />
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <Label for="firstName">Prénom</Label>
            <Input id="firstName" v-model="userInfo.firstname" />
          </div>
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="nationality">Nationalité</Label>
          <Input id="nationality" v-model="userInfo.nationality" />
        </div>
        <div class="flex gap-4">
          <div class="flex flex-1 flex-col gap-2">
            <Label for="birthdate">Date de Naissance</Label>
            <Input id="birthdate" v-model="userInfo.birthDate" />
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <Label for="promotion">Promo</Label>
            <Input id="promotion" v-model="userInfo.promotion" />
          </div>
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="roles">Rôles</Label>
          <TagsInput v-model="possibleRoles">
            <TagsInputItem v-for="item in possibleRoles" :key="item" :value="item">
              <TagsInputItemText />
              <TagsInputItemDelete />
            </TagsInputItem>

            <TagsInputInput placeholder="Rôles" class="py-1" />
          </TagsInput>
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="email">Email personel</Label>
          <Input id="email" v-model="userInfo.email" />
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="telegramId">Telegram (optionnel)</Label>
          <Input id="telegramId" v-model="userInfo.telegramId" />
        </div>
        <!-- <div class="flex flex-col gap-2 flex-1">
          <Label for="telegramId">LinkedIn</Label>
          <Input id="telegramId" v-model="userInfo.linkedin" />
        </div> -->
        <div class="flex flex-1 flex-col gap-2">
          <Label for="phoneNumber">Numéro de Téléphone (optionnel)</Label>
          <Input id="phoneNumber" v-model="userInfo.landlinePhoneNumber" />
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="phoneNumber">Téléphone portable (optionnel)</Label>
          <Input id="phoneNumber" v-model="userInfo.mobilePhoneNumber" />
        </div>
        <Button class="w-full">Mettre à jour les informations</Button>
      </CardContent>
    </Card>
  </Wrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { Member } from '@/types/api'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const possibleRoles = ref<string[]>(['Vice-Trésorier', 'Intervenant'])

const userInfo = ref<Member>({
  personId: '',
  firstname: authStore.firstName,
  lastname: authStore.lastName,
  gender: '',
  landlinePhoneNumber: '',
  mobilePhoneNumber: '',
  email: '',
  memberId: '',
  birthDate: '',
  nationality: 'FRA',
  promotion: '2026',
  contributionDate: '',
  paymentMethod: '',
  department: '',
  telegramId: '',
  createdAt: '',
  updatedAt: ''
})
</script>
