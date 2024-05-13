<template>
  <div class="flex flex-col gap-4">
    <Card class="flex-1">
      <CardHeader>
        <Icon name="badge" class="text-6xl" />
        <span class="text-accent"> Informations du Membre </span>
        <Button class="ml-10" v-if="!canEdit" @click="handleClick"
          >Valider les modifications</Button
        >
      </CardHeader>
      <CardContent>
        <div class="flex items-end gap-4">
          <div class="flex flex-1 flex-col gap-2">
            <Label for="lastname">Nom</Label>
            <Input :disabled="!canEdit" id="lastname" v-model="form.lastname" />
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <Label for="firstname">Prénom</Label>
            <Input :disabled="!canEdit" id="firstname" v-model="form.firstname" />
          </div>
        </div>

        <div class="flex items-start gap-4">
          <div class="flex flex-1 flex-col gap-2">
            <Label for="gender">Genre</Label>
            <div class="flex flex-1 flex-row gap-2">
              <Input
                :disabled="!canEdit"
                v-if="ModifyGender == false"
                id="firstname"
                v-model="form.gender"
              />
              <Button v-if="ModifyGender == false" @click="handleModifyGender"
                ><Icon name="edit"
              /></Button>
              <Select v-model="form.gender" v-if="ModifyGender == true">
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
          </div>

          <div class="flex flex-1 flex-col gap-2">
            <Label for="mobilePhone">N° de Téléphone Mobile</Label>
            <Input id="mobilePhone" placeholder="Info" v-model="form.mobilePhone" />
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <Label for="landlinePhone">N° de Téléphone</Label>
            <Input id="landlinePhone" placeholder="Tel Fixe" v-model="form.landlinePhone" />
          </div>
        </div>
        <div class="flex items-start gap-4">
          <div class="flex flex-1 flex-col gap-2">
            <Label for="landlinePhone">Email</Label>
            <Input id="landlinePhone" placeholder="Tel Fixe" v-model="form.email" />
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <Label for="landlinePhone">Premier Contact</Label>
            <div class="flex flex-1 flex-row gap-2">
              <Input
                :disabled="!canEdit"
                v-if="!ModifyFirstContact"
                id="firstname"
                v-model="form.firstContact"
              />
              <Button v-if="ModifyFirstContact == false" @click="handleModifyFirstContact"
                ><Icon name="edit"
              /></Button>
              <Select v-model="form.firstContact" v-if="ModifyFirstContact">
                <SelectTrigger>
                  <SelectValue placeholder="Comment AEI a eu le premier contact" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Bouche à oreille"> Bouche à oreille </SelectItem>
                    <SelectItem value="Soirée partenaire"> Soirée partenaire </SelectItem>
                    <SelectItem value="Appel téléphonique"> Appel téléphonique </SelectItem>
                    <SelectItem value="Site AEI"> Site AEI</SelectItem>
                    <SelectItem value="Congrès"> Congrès </SelectItem>
                    <SelectItem value="Salon"> Salon </SelectItem>
                    <SelectItem value="RS"> Réseaux Sociaux (LinkedIn, Instagram, ...) </SelectItem>
                    <SelectItem value="Autre"> Autre </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div class="flex items-start gap-4">
          <div class="flex flex-col gap-2">
            <Label for="name">Nom de l'Entreprise</Label>
            <Input id="name" placeholder="Tel Fixe" v-model="form.name" />
          </div>
          <div class="flex flex-col gap-2">
            <Label for="landlinePhone">Poste dans l'entreprise</Label>
            <Input id="landlinePhone" placeholder="Tel Fixe" v-model="form.function" />
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <Label for="legalEntity">N° de SIRET de l'entreprise</Label>
            <Input id="legalEntity" placeholder="Tel Fixe" v-model="form.legalEntity" />
          </div>
        </div>
        <div class="flex items-end gap-4">
          <div class="flex flex-1 flex-col gap-2">
            <Label for="name">Type d'Entreprise</Label>
            <div class="flex flex-1 flex-row gap-2">
              <Input
                :disabled="!canEdit"
                v-if="!ModifyCompanyType"
                id="firstname"
                v-model="form.companyType"
              />
              <Button v-if="ModifyCompanyType == false" @click="handleModifyCompanyType"
                ><Icon name="edit"
              /></Button>
              <Select v-model="form.companyType" v-if="ModifyCompanyType">
                <SelectTrigger>
                  <SelectValue placeholder="Type d'entreprise" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Particulier"> Particulier </SelectItem>
                    <SelectItem value="Association"> Association </SelectItem>
                    <SelectItem value="TPE"> TPE (- de 20 employés) </SelectItem>
                    <SelectItem value="PME"> PME (+ de 20 employés)</SelectItem>
                    <SelectItem value="Grand Groupe"> Grand Groupe </SelectItem>
                    <SelectItem value="Ecole"> Ecole </SelectItem>
                    <SelectItem value="Administration"> Administration </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <Label for="Ac">Domaine</Label>
            <Input id="legalEntity" placeholder="Tel Fixe" v-model="form.activityField" />
          </div>
        </div>

        <div class="flex items-end gap-4">
          <div class="flex flex-1 flex-col gap-2">
            <Label for="name">Adresse </Label>
            <Input id="address" placeholder="Tel Fixe" v-model="form.address" />
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <Label for="legalEntity">Complément d'adresse</Label>
            <Input
              id="additionnalAddress"
              placeholder="Tel Fixe"
              v-model="form.additionnalAddress"
            />
          </div>
        </div>
        <div class="flex items-end gap-4">
          <div class="mt-2 flex flex-1 flex-col gap-2">
            <Label for="name">Code Postal </Label>
            <Input id="postCode" placeholder="Tel Fixe" v-model="form.postCode" />
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <Label for="legalEntity">Ville</Label>
            <Input id="city" placeholder="Tel Fixe" v-model="form.city" />
          </div>
        </div>
        <div class="mt-2 flex flex-1 flex-col gap-2">
          <Label for="legalEntity">Pays</Label>
          <Input id="country" placeholder="Tel Fixe" v-model="form.country" />
        </div>
      </CardContent>
    </Card>
    <Toaster />
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import { onMounted, ref } from 'vue'
import { useToast } from '@/components/ui/toast/use-toast'
import type { ClientInfo } from '@/types/api'

const props = defineProps<{
  clientId: number
}>()

const { toast } = useToast()

const canEdit = ref(false) // to be modified when permissions are added
const ModifyGender = ref(false)
const ModifyFirstContact = ref(false)
const ModifyCompanyType = ref(false)

const handleModifyGender = () => {
  ModifyGender.value = true
}

const handleModifyFirstContact = () => {
  ModifyFirstContact.value = true
}

const handleModifyCompanyType = () => {
  ModifyCompanyType.value = true
}

// We define the data for the member

const form = ref<ClientInfo>({
  personId: NaN,
  lastname: '',
  firstname: '',
  gender: '',
  mobilePhone: '',
  landlinePhone: '',
  email: '',
  createdAt: '',
  updatedAt: '',

  name: '',
  legalEntity: '',
  addressId: NaN,
  companyType: '',
  activityField: '',

  function: '',
  firstContact: '',
  companyId: NaN,

  address: '',
  additionnalAddress: '',
  city: '',
  postCode: '',
  country: ''
})

async function fetchInfos() {
  // We fetch the person info
  await fetchPersonInfos()

  // We fetch the client info
  await fetchClientInfos()

  // We fetch the company info
  await fetchCompanyInfos()

  // We fetch the adress info
  await fetchAddressInfos()
}

async function fetchAddressInfos() {
  await axios
    .get(`/address/${form.value.addressId}`, {
      headers: {
        Authorization: `Bearer ${useAuthStore().token}`
      }
    })
    .then((response) => {
      const address = response.data.data.address
      form.value.address = address.address
      form.value.additionnalAddress = address.additionnalAddress
      form.value.city = address.city
      form.value.postCode = address.postCode
      form.value.country = address.country
    })
    .catch((error) => {
      console.error(error)
    })
}

async function fetchPersonInfos() {
  await axios
    .get(`/person/${props.clientId}`, {
      headers: {
        Authorization: `Bearer ${useAuthStore().token}`
      }
    })
    .then((response) => {
      const person = response.data.data.person
      form.value.personId = person.personId
      form.value.lastname = person.lastname
      form.value.firstname = person.firstname
      form.value.gender = person.gender
      form.value.mobilePhone = person.mobilePhone
      form.value.landlinePhone = person.landlinePhone
      form.value.email = person.email
      form.value.createdAt = person.createdAt.toString()
      form.value.updatedAt = person.updatedAt.toString()
    })
    .catch((error) => {
      console.error(error)
    })
}

async function fetchClientInfos() {
  await axios
    .get(`/client/${props.clientId}`, {
      headers: {
        Authorization: `Bearer ${useAuthStore().token}`
      }
    })
    .then((response) => {
      const client = response.data.data.client

      form.value.function = client.function
      form.value.companyId = client.companyId
      form.value.firstContact = client.firstContact
    })
    .catch((error) => {
      console.error(error)
    })
}

async function fetchCompanyInfos() {
  await axios
    .get(`/company/${form.value.companyId}`, {
      headers: {
        Authorization: `Bearer ${useAuthStore().token}`
      }
    })
    .then((response) => {
      const company = response.data.data.company

      form.value.name = company.name
      form.value.legalEntity = company.legalEntity
      form.value.addressId = company.addressId
      form.value.companyType = company.companyType
      form.value.activityField = company.activityField
    })
    .catch((error) => {
      console.error(error)
    })
}

onMounted(() => {
  fetchInfos()
})

async function updateAddress() {
  if (!form.value.additionnalAddress) {
    form.value.additionnalAddress = ''
  }
  await axios
    .put(
      `/address/${form.value.addressId}`,
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
    .then(() => {
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
async function updateCompany() {
  await axios
    .put(
      `/company/${form.value.companyId}`,
      {
        company: {
          name: form.value.name,
          legalEntity: form.value.legalEntity,
          addressId: form.value.addressId,
          companyType: form.value.companyType,
          activityField: form.value.activityField
        }
      },
      {
        headers: {
          Authorization: `Bearer ${useAuthStore().token}`
        }
      }
    )
    .then(() => {
      console.log('Before' + form.value.companyId)

      toast({
        title: 'Entreprise renseignée',
        description: `${form.value.companyId}`
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

async function updatePerson() {
  await axios
    .put(
      `/person/${form.value.personId}`,
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
    .then(() => {
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

async function updateClient() {
  console.log(form.value.personId)
  await axios
    .put(
      `/client/${form.value.personId}`,
      {
        client: {
          clientId: form.value.personId,
          function: form.value.function,
          companyId: form.value.companyId,
          firstContact: form.value.firstContact
        }
      },
      {
        headers: {
          Authorization: `Bearer ${useAuthStore().token}`
        }
      }
    )
    .then(() => {
      toast({
        title: 'Modification effectué'
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

const handleClick = () => {
  updateAddress()
  updateCompany()
  updatePerson()
  updateClient()
}
</script>
