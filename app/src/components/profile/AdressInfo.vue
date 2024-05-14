<template>
  <Card class="h-auto">
    <CardHeader class="flex justify-between items-center">
      <div class="flex items-center">
        <Icon name="pin_drop" class="text-6xl" />
      <span class="text-accent"> Adresse </span>
      </div>
      <Button class="ml-5" variant="outline" v-if="!canEdit" @click="handleClickModif">Passer en mode Modif</Button>

      <Button class="ml-5" v-if="canEdit" @click="handleClickValidate">Valider les modifications</Button>

    </CardHeader>
    <CardContent>
      <div class="flex items-end gap-4">
        <div class="flex flex-1 flex-col gap-2">
          <Label for="name">Adresse </Label>
          <Input :disabled="!canEdit" id="address"v-model="form.address" />
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="legalEntity">Complément d'adresse</Label>
          <Input :disabled="!canEdit" id="additionnalAddress"  v-model="form.additionnalAddress" />
        </div>
      </div>
      <div class="flex items-end gap-4">
        <div class="mt-2 flex flex-1 flex-col gap-2">
          <Label for="name">Code Postal </Label>
          <Input :disabled="!canEdit" id="postCode"  v-model="form.postCode" />
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="legalEntity">Ville</Label>
          <Input :disabled="!canEdit" id="city"  v-model="form.city" />
        </div>
      </div>
      <div class="mt-2 flex flex-1 flex-col gap-2">
        <Label for="legalEntity">Pays</Label>
        <Input :disabled="!canEdit" id="country"  v-model="form.country" />
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import type { Address } from '@/types/api'

import { parseAbsoluteToLocal, type DateValue } from '@internationalized/date'
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()
const editUserData = () => {
  alert('Not Implemented Yet (route not ready)')
}

const props = defineProps<{
  memberId: number
}>()

const canEdit = ref(false) // to be edited when permissions are added

const form = ref<Address>({
  addressId: NaN,
  address: '',
  additionnalAddress: '',
  city: '',
  postCode: '',
  country: '',
})

async function getData(){

  const member = await axios.get(`/member/${props.memberId}`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const memberInfo = member.data.data.member;
  console.log(memberInfo.addressId)

  const address = await axios.get(`/address/${memberInfo.addressId}`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const adressInfo = address.data.data.address
  console.log(adressInfo)


  form.value.addressId =  adressInfo.addressId
  form.value.address =  adressInfo.address
  form.value.additionnalAddress =  adressInfo.additionnalAddress
  form.value.city =  adressInfo.city
  form.value.postCode =  adressInfo.postCode
  form.value.country =  adressInfo.country

}

async function updateAdress() {
  await axios
    .put(
      `/address/${form.value.addressId }`,
      {
        address: {
          addressId: form.value.addressId ,
          address: form.value.address,
          additionnalAddress: form.value.additionnalAddress,
          city: form.value.city,
          postCode: form.value.postCode,
          country: form.value.country
        }
      },
      {
        headers: {
          Authorization: `Bearer ${useAuthStore().token}`
        }
      }
    )
    .then((response) => {
      form.value.addressId = response.data.data.addressId
      toast({
        title: 'Adresse modifié',
      })
    })
    .catch((error) => {
      console.error(error)
      toast({
        title: 'Something wrong happened',
        variant: 'destructive',
        description: `${error.response.data.message}`
      })
    })
}

const data = ref<Address>()

onMounted(async () => {
  await getData()
})


const handleClickValidate = () => {
  updateAdress()

}
const handleClickModif = () => {
  canEdit.value = true
}
</script>
