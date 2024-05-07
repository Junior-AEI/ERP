<template>
  <div>
    <Card class="max-w-2xl flex-1">
      <CardHeader>
        <Icon name="person_add" class="text-6xl" />
        <span class="text-accent"> Créer un nouveau client</span>
      </CardHeader>
      <CardContent>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="person">Personne</Label>
          <Input id="person" v-model="memberInfo.personId" />
        </div>
        <div class="flex items-end gap-4">
          <div class="flex flex-1 flex-col gap-2">
            <Label for="birthDate">Date de naissance</Label>
            <Input id="birthDate" v-model="temp" />
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <Label for="birthPlace">Lieu de naissance</Label>
            <Input id="birthPlace" v-model="memberInfo.birthPlace" />
          </div>
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="nationality">Nationalité</Label>
          <Input id="nationality" v-model="memberInfo.nationality" />
        </div>
        <div class="flex items-end gap-4">
          <div class="flex flex-1 flex-col gap-2">
            <Label for="department">Fillière</Label>
            <Input id="department" placeholder="Info" v-model="memberInfo.department" />
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <Label for="promotion">Promo</Label>
            <Input
              id="promotion"
              :placeholder="new Date().getFullYear() + 2"
              v-model="memberInfo.promotion"
            />
          </div>
        </div>
        <div class="flex justify-end gap-4">
          <div class="flex flex-1 flex-col gap-2">
            <Label for="membershipNumber">Numéro de cotisation</Label>
            <Input id="membershipNumber" v-model="memberInfo.membershipNumber" />
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <Label for="contributionDate">Date de cotisation</Label>
            <Input id="contributionDate" v-model="temp" />
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <Label for="paymentMethod">Moyen de paiement</Label>
            <Input id="paymentMethod" v-model="memberInfo.paymentMethod" />
          </div>
        </div>

        <Button @click="console.log()">Créer un nouveau Client</Button>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const temp = ref('temp')

const form = ref<ClientInfo>({
  expenseId: NaN,
  userId: user.userId,
  approbatorId: NaN,
  reason: "",
  expenseDate: "",
  description: "",
  state: "",
})
</script>
