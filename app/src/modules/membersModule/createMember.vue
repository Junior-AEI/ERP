<template>
  <div>
    <Card class="max-w-2xl flex-1">
      <CardHeader>
        <Icon name="person_add" class="text-6xl" />
        <span class="text-accent"> Créer un nouveau membre</span>
      </CardHeader>
      <CardContent>
        <div class="flex items-end gap-4">
          <div class="flex flex-1 flex-col gap-2">
            <Label for="lastname">Nom</Label>
            <Input id="lastname" placeholder="Doe" v-model="form.lastname" />
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <Label for="firstname">Prénom</Label>
            <Input id="firstname" placeholder="John" v-model="form.firstname" />
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
                <SelectItem value="M"> Homme </SelectItem>
                <SelectItem value="F"> Femme </SelectItem>
                <SelectItem value="O"> Autre </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div class="flex items-end gap-4">
          <div class="flex flex-1 flex-col gap-2">
            <Label for="birthDate">Date de naissance</Label>
            <DatePickerComponent v-model="birthDateFormat" />
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <Label for="birthPlace">Lieu de naissance</Label>
            <Input id="birthPlace" placeholder="Talence" v-model="form.birthPlace" />
          </div>
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="nationality">Nationalité</Label>
          <Input id="nationality" placeholder="FRA ou MAR ou ESP" v-model="form.nationality" />
        </div>
        <div class="flex items-end gap-4">
          <div class="flex flex-1 flex-col gap-2">
            <Label for="department">Filière</Label>
            <Select v-model="form.department">
              <SelectTrigger>
                <SelectValue placeholder="Filière" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Informatique"> Info </SelectItem>
                  <SelectItem value="Telecommunication"> Telecom </SelectItem>
                  <SelectItem value="Matmeca"> Matmeca </SelectItem>
                  <SelectItem value="Electronique"> Elec </SelectItem>
                  <SelectItem value="R&I"> R&I </SelectItem>
                  <SelectItem value="SEE"> SEE </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <Label for="promotion">Promo</Label>
            <Input
              id="promotion"
              :placeholder="new Date().getFullYear() + 2"
              v-model="form.promotion"
            />
          </div>
        </div>
        <div class="flex items-end gap-4">
          <div class="flex flex-1 flex-col gap-2">
            <Label for="mobilePhone">N° de Téléphone Mobile</Label>
            <Input id="mobilePhone" placeholder="+3356666666666 (Attention +33)" v-model="form.mobilePhone" />
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <Label for="landlinePhone">N° de Téléphone</Label>
            <Input id="landlinePhone" placeholder="+3356666666666 (Attention +33)" v-model="form.landlinePhone" />
          </div>
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="landlinePhone">Email</Label>
          <Input id="landlinePhone" placeholder="john@yahoo.com" v-model="form.email" />
        </div>
        <div class="flex justify-end gap-4">
          <div class="flex flex-1 flex-col gap-2">
            <Label for="membershipNumber">Numéro de cotisation</Label>
            <Input id="membershipNumber" placeholder="24666" v-model="membershipNumberFormat" />
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <Label for="contributionDate">Date de cotisation</Label>
            <DatePickerComponent v-model="contributionDateFormat" />
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <Label for="paymentMethod">Moyen de paiement de la Cotisation</Label>
            <Select v-model="form.paymentMethod">
              <SelectTrigger>
                <SelectValue placeholder="Moyen de Payement" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="HelloAsso"> Hello Asso </SelectItem>
                  <SelectItem value="LydiaPro"> Lydia Pro </SelectItem>
                  <SelectItem value="Vir"> Virement </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div class="flex justify-end gap-4">
          <div class="flex flex-1 flex-col gap-2">
            <Label for="membershipNumber">@Telegram</Label>
            <Input id="membershipNumber" placeholder="@johndoe" v-model="form.telegramId" />
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <Label for="contributionDate">Chat ID (Pour connexion Bot Telegram)</Label>
            <Input id="membershipNumber" v-model="form.chatBotId" />
          </div>
        </div>
        <div class="flex items-end gap-4">
          <div class="flex flex-1 flex-col gap-2">
            <Label for="application">Adresse</Label>
            <Combobox
              @input="handleInputAddress"
              :options="addressList"
              :comboboxLabel="'Selectionner l\'adresse'"
            >
            </Combobox>
            <Button variant="outline" @click="handleClickNewAdress"
              >Renseigner une nouvelle Adresse</Button
            >
          </div>
          <div class="flex flex-1 flex-col gap-2"></div>
        </div>

        <div v-if="form.addressId == 0">
          <div class="flex items-end gap-4">
            <div class="flex flex-1 flex-col gap-2">
              <Label for="name">Adresse </Label>
              <Input id="address" placeholder="1 avenue du Dr Albert Schweitzer" v-model="form.address" />
            </div>
            <div class="flex flex-1 flex-col gap-2">
              <Label for="legalEntity">Complément d'adresse</Label>
              <Input
                id="additionnalAddress"
                placeholder="Appt 133"
                v-model="form.additionnalAddress"
              />
            </div>
          </div>
          <div class="flex items-end gap-4">
            <div class="mt-2 flex flex-1 flex-col gap-2">
              <Label for="name">Code Postal </Label>
              <Input id="postCode" placeholder="33400" v-model="form.postCode" />
            </div>
            <div class="flex flex-1 flex-col gap-2">
              <Label for="legalEntity">Ville</Label>
              <Input id="city" placeholder="Talence" v-model="form.city" />
            </div>
          </div>
          <div class="mt-2 flex flex-1 flex-col gap-2">
            <Label for="legalEntity">Pays</Label>
            <Input id="country" placeholder="FRA" v-model="form.country" />
          </div>
        </div>
        <Button @click="handleClick" class="mt-3">Créer un nouveau Membre</Button>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import axios from 'axios'
import { useToast } from '@/components/ui/toast/use-toast'
import type { FullMemberWithAdress } from '@/types/api'
import { type DateValue } from '@internationalized/date'

const form = ref<FullMemberWithAdress>({
  personId: NaN,
  lastname: '',
  firstname: '',
  gender: '',
  mobilePhone: '',
  landlinePhone: '',
  email: '',

  memberId: NaN,
  birthDate: '',
  birthPlace: '',
  nationality: '',
  promotion: '',
  contributionDate: '',
  paymentMethod: '',
  department: '',
  membershipNumber: NaN,
  telegramId: '',
  chatBotId: '',

  addressId: NaN,
  address: '',
  additionnalAddress: '',
  city: '',
  postCode: '',
  country: '',
  createdAt: '',
  updatedAt: ''
})

const membershipNumberFormat = ref<string>()
const contributionDateFormat = ref<DateValue>()
const birthDateFormat = ref<DateValue>()

const handleInputAddress = (value: string) => {
  form.value.addressId = parseInt(value)
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
      label: address.address
    }
  })

  return addressesLists
}

const addressList = ref([] as { value: string; label: string }[]) // Initialisation d'une liste réactive vide
const handleClickNewAdress = () => {
  form.value.addressId = 0
}
onMounted(async () => {
  addressList.value = await getDataAddress()
})

const { toast } = useToast()

async function newAddress() {
  await axios
    .post(
      `/address/`,
      {
        address: {
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
        title: 'Adresse renseignée',
        description: `${form.value.address}`
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

async function newPerson() {
  await axios
    .post(
      `/person/`,
      {
        person: {
          lastname: form.value.lastname,
          firstname: form.value.firstname,
          gender: form.value.gender,
          mobilePhone: form.value.mobilePhone,
          landlinePhone: form.value.landlinePhone,
          email: form.value.email
        }
      },
      {
        headers: {
          Authorization: `Bearer ${useAuthStore().token}`
        }
      }
    )
    .then((response) => {
      form.value.personId = response.data.data.personId
      toast({
        title: 'PErsonne renseignée',
        description: `${form.value.personId}`
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

async function newMember() {
  if (contributionDateFormat.value) {
    form.value.contributionDate = contributionDateFormat.value.toString()
  }
  if (membershipNumberFormat.value) {
    form.value.membershipNumber = parseInt(membershipNumberFormat.value)
  }
  if (birthDateFormat.value) {
    form.value.birthDate = birthDateFormat.value.toString()
  }
  console.log(form.value.personId)
  await axios
    .post(
      `/member/`,
      {
        member: {
          memberId: form.value.personId,
          birthDate: form.value.birthDate,
          birthPlace: form.value.birthPlace,
          nationality: form.value.nationality,
          promotion: form.value.promotion,
          contributionDate: form.value.contributionDate,
          department: form.value.department,
          membershipNumber: form.value.membershipNumber,
          addressId: form.value.addressId
        }
      },
      {
        headers: {
          Authorization: `Bearer ${useAuthStore().token}`
        }
      }
    )
    .then((response) => {
      toast({
        title: 'Personne renseignée',
        description: `${response.data.data.memberId}`
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
async function handleClick() {
  if (form.value.addressId == 0) {
    await newAddress()
  }
  console.log(form.value.addressId)
  await newPerson()
  console.log(form.value.personId)

  await newMember()
}
</script>
