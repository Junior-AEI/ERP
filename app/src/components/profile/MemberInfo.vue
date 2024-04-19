<template>
  <Card class="flex-1">
    <CardHeader>
      <Icon name="person" class="text-6xl" />
      <span class="text-accent"> Informations sur le Membre </span>
    </CardHeader>
    <CardContent>
      <div class="flex flex-wrap items-end gap-4">
        <div class="flex flex-1 flex-col gap-2">
          <Label for="memberId">Identifiant du Membre</Label>
          <Input disabled id="memberId" v-model="memberInfo.memberId" />
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="memberId">Date de cotisation</Label>
          <Popover>
            <PopoverTrigger as-child>
              <Button
                :variant="'outline'"
                :class="
                  cn(
                    'w-full justify-start text-left font-normal',
                    !memberInfo.contributionDate && 'text-muted-foreground'
                  )
                "
              >
                <Icon name="calendar_month" class="mr-2" />
                <span>{{
                  memberInfo.contributionDate
                    ? memberInfo.contributionDate.toLocaleDateString('fr-FR')
                    : 'Définir la date de fin de mandat'
                }}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0">
              <Calendar v-model="memberInfo.contributionDate" />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div class="flex flex-wrap justify-end gap-4">
        <div class="flex flex-1 flex-col gap-2">
          <Label for="birthPlace">Lieu de naissance</Label>
          <Input id="birthPlace" v-model="memberInfo.birthPlace" />
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="birthPlace">Anniversaire</Label>
          <Popover>
            <PopoverTrigger as-child>
              <Button
                :variant="'outline'"
                :class="
                  cn(
                    'w-full justify-start text-left font-normal',
                    !memberInfo.birthDate && 'text-muted-foreground'
                  )
                "
              >
                <Icon name="calendar_month" class="mr-2" />
                <span>{{
                  memberInfo.birthDate
                    ? memberInfo.birthDate.toLocaleDateString('fr-FR')
                    : 'Définir la date de fin de mandat'
                }}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0">
              <Calendar v-model="memberInfo.birthDate" />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <Button @click="editMemberData()">Modifier</Button>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import { cn } from '@/lib/utils'

const editMemberData = () => {
  alert('Fonctionnalité non implémentée')
}

const props = defineProps<{
  memberId: number
}>()

const memberInfo = {
  memberId: props.memberId,
  birthDate: new Date(),
  birthPlace: '',
  nationality: '',
  promotion: '',
  contributionDate: new Date(),
  paymentMethod: '',
  department: '',
  addressId: '',
  createdAt: new Date(),
  updatedAt: new Date()
}

axios
  .get(`/member/${props.memberId}`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })
  .then((response) => {
    const member = response.data.data.member
    console.log(member)
    memberInfo.birthDate = new Date(member.birthDate)
    memberInfo.birthPlace = member.birthPlace
    memberInfo.nationality = member.nationality
    memberInfo.promotion = member.promotion
    memberInfo.contributionDate = new Date(member.contributionDate)
    memberInfo.paymentMethod = member.paymentMethod
    memberInfo.department = member.department
    memberInfo.addressId = member.addressId
    memberInfo.createdAt = new Date(member.createdAt)
    memberInfo.updatedAt = new Date(member.updatedAt)
  })
  .catch((error) => {
    console.error(error)
  })
</script>
