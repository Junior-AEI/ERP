<template>
  <div>
    <Card class="max-w-2xl flex-1">
      <CardHeader>
        <Icon name="person_add" class="text-6xl" />
        <span class="text-accent"> Créer un nouveau client</span>
      </CardHeader>
      <CardContent>
        <div class="flex items-end gap-4">
          <div class="flex flex-1 flex-col gap-2">
            <Label for="lastname">Nom</Label>
            <Input id="lastname" v-model="form.lastname" />
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <Label for="firstname">Prénom</Label>
            <Input id="firstname" v-model="form.firstname" />
          </div>
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="gender">Genre</Label>
          <Select v-model="form.gender">
    <SelectTrigger>
      <SelectValue placeholder="Genre" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="H">
          Homme
        </SelectItem>
        <SelectItem value="F">
          Femme
        </SelectItem>
        <SelectItem value="O">
          Other
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
        </div>
        <div class="flex items-end gap-4">
          <div class="flex flex-1 flex-col gap-2">
            <Label for="mobilePhone">N° de Téléphone Mobile</Label>
            <Input id="mobilePhone" placeholder="Info" v-model="form.mobilePhone" />
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <Label for="landlinePhone">N° de Téléphone</Label>
            <Input
              id="landlinePhone"
              placeholder="Tel Fixe"
              v-model="form.landlinePhone"
            />
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <Label for="application"
            >Entreprise du Client</Label
          >
          <Combobox
            @input="handleInput"
            :options="companyList"
            :comboboxLabel="'Selectionner l\'entreprise'"
          ></Combobox>
        </div>
        <div
              v-if="form.companyId == 0">
              <div class="flex items-end gap-4">

              <div class="flex flex-1 flex-col gap-2">
            <Label for="name">Nom de l'Entreprise</Label>
            <Input
              id="name"
              placeholder="Tel Fixe"
              v-model="form.name"
            />
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <Label for="legalEntity">N° de SIRET de l'entreprise</Label>
            <Input
              id="legalEntity"
              placeholder="Tel Fixe"
              v-model="form.legalEntity"
            />
          </div>
              </div>
              <div class="flex flex-col gap-2">
          <Label for="application"
            >Adresse de l'Entreprise</Label
          >
          <Combobox
            @input="handleInput"
            :options="addressList"
            :comboboxLabel="'Selectionner l\'entreprise'"
          ></Combobox>
        </div>
            </div>
            




        <Button @click="console.log()">Créer un nouveau Client</Button>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import axios from 'axios'

const temp = ref('temp')
import type { ClientInfo } from '@/types/api'

const form = ref<ClientInfo>({
  personId:NaN,
  lastname: "",
  firstname: "",
  gender: "",
  mobilePhone: "",
  landlinePhone: "",
  email:"",
  createdAt:"",
  updatedAt:"",
  name:"",
  legalEntity:"",
  addressId:NaN,
  function:"",
  companyId:NaN,
  address: "",
  additionnalAddress: "",
  city: "",
  postCode: "",
  country: ""
})


async function getDataCompany(): Promise<{ value: string; label: string }[]> {
  // Fetch data from your API here.

  const companies = await axios.get(`/company`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const companiesLists = companies.data.data?.companies.map((company: any) => {
    return {
      value: company.companyId.toString(),
      label: company.name
    }
  })


  return companiesLists
}

async function getDataAddress(): Promise<{ value: string; label: string }[]> {
  // Fetch data from your API here.

  const addresses = await axios.get(`/address`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const addressesLists = addresses.data.data?.addresses.map((address: any) => {
    return {
      value: address.addressId.toString(),
      label: address.name
    }
  })


  return addressesLists
}

const handleInput = (value: string) => {
  form.value.companyId = parseInt(value)
}

const companyList = ref([] as { value: string; label: string }[]) // Initialisation d'une liste réactive vide
const addressList = ref([] as { value: string; label: string }[]) // Initialisation d'une liste réactive vide

onMounted(async () => {
  companyList.value = await getDataCompany()
  companyList.value.push({ value: '0', label: 'Entreprise non présente' })
  addressList.value = await getDataAddress()
  addressList.value.push({ value: '0', label: 'Adresse non présente' })

})

</script>
