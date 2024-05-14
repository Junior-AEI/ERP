<template>
  <div class="flex flex-row gap-4">
    <Card class="max-w-2xl flex-1">
      <CardHeader>
        <Icon name="person_add" class="text-6xl" />
        <span class="text-accent"> Ajouter une nouvelle étude</span>
      </CardHeader>
      <CardContent>
        <div class="flex items-end gap-4">
          <div class="flex flex-1 flex-col gap-2">
            <Label for="client">Client</Label>
            <div class="flex flex-1 flex-wrap gap-2">

              <Combobox @input="handleInputClient" :options="clientsList"
                :comboboxLabel="'Selectionner un client existant'">
              </Combobox>
              <Button class="flex-1" variant="outline" icon="edit" @click="handleClickNewClient">Rentrer un nouveau
                client</Button>
            </div>
          </div>
        </div>

        <div v-if="form.clientId == 0" class="flex flex-col gap-3">
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
                  <SelectItem value="M"> Homme </SelectItem>
                  <SelectItem value="F"> Femme </SelectItem>
                  <SelectItem value="O"> Autre </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div class="flex items-end gap-4">
            <div class="flex flex-1 flex-col gap-2">
              <Label for="mobilePhone">N° de Téléphone Mobile</Label>
              <Input id="mobilePhone" placeholder="Mobile" v-model="form.mobilePhone" />
            </div>
            <div class="flex flex-1 flex-col gap-2">
              <Label for="landlinePhone">N° de Téléphone</Label>
              <Input id="landlinePhone" placeholder="Tel Fixe" v-model="form.landlinePhone" />
            </div>
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <Label for="landlinePhone">Email</Label>
            <Input id="landlinePhone" placeholder="@" v-model="form.email" />
          </div>
          <div class="flex items-start gap-4">
            <div class="flex flex-col gap-2">
              <Label for="application">Entreprise du Client</Label>
              <div class="flex flex-1 flex-wrap gap-2">

                <Combobox @input="handleInputCompany" :options="companyList"
                  :comboboxLabel="'Selectionner l\'entreprise'">
                </Combobox>
                <Button variant="outline" icon="edit" @click="handleClickNewCompany">Renseigner une nouvelle
                  entreprise</Button>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <div class="flex flex-1 flex-col gap-2">
                <Label for="landlinePhone">Poste dans l'entreprise</Label>
                <Input id="landlinePhone" placeholder="Poste" v-model="form.function" />
              </div>
              <div class="flex flex-1 flex-col gap-2">
                <Label for="landlinePhone">Premier Contact</Label>
                <Select v-model="form.firstContact">
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
                      <SelectItem value="RS">
                        Réseaux Sociaux (LinkedIn, Instagram, ...)
                      </SelectItem>
                      <SelectItem value="Autre"> Autre </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div v-if="form.companyId == 0" class="flex flex-col gap-3">
            <div class="flex items-end gap-4">
              <div class="flex flex-1 flex-col gap-2">
                <Label for="name">Nom de l'Entreprise</Label>
                <Input id="name" placeholder="Entreprise" v-model="form.name" />
              </div>
              <div class="flex flex-1 flex-col gap-2">
                <Label for="legalEntity">N° de SIRET de l'entreprise</Label>
                <Input id="legalEntity" placeholder="n° ..." v-model="form.legalEntity" />
              </div>
            </div>
            <div class="flex items-end gap-4">
              <div class="flex flex-1 flex-col gap-2">
                <Label for="name">Type d'Entreprise</Label>
                <Select v-model="form.companyType">
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
              <div class="flex flex-1 flex-col gap-2">
                <Label for="Ac">Domaine</Label>
                <Input id="legalEntity" placeholder="Spatial" v-model="form.activityField" />
              </div>
            </div>
            <div class="mt-2 flex flex-col gap-2">
              <div class="flex items-end gap-4">
                <div class="flex flex-1 flex-col gap-2">
                  <Label for="application">Adresse de l'Entreprise</Label>
                  <div class="flex flex-1 flex-wrap gap-2">

                    <Combobox @input="handleInputAddress" :options="addressList"
                    :comboboxLabel="'Selectionner l\'adresse'">
                  </Combobox>
                  <Button variant="outline" icon="edit" @click="handleClickNewAdress">Renseigner une nouvelle Adresse</Button>
                </div>
                </div>
                <div class="flex flex-1 flex-col gap-2"></div>
              </div>
            </div>
          </div>

          <div v-if="form.addressId == 0">
            <div class="flex items-end gap-4">
              <div class="flex flex-1 flex-col gap-2">
                <Label for="name">Adresse </Label>
                <Input id="address" placeholder="Tel Fixe" v-model="form.address" />
              </div>
              <div class="flex flex-1 flex-col gap-2">
                <Label for="legalEntity">Complément d'adresse</Label>
                <Input id="additionnalAddress" placeholder="Bâtiment, ..." v-model="form.additionnalAddress" />
              </div>
            </div>
            <div class="flex items-end gap-4">
              <div class="mt-2 flex flex-1 flex-col gap-2">
                <Label for="name">Code Postal </Label>
                <Input id="postCode" placeholder="33400" v-model="form.postCode" />
              </div>
              <div class="flex flex-1 flex-col gap-2">
                <Label for="legalEntity">Ville</Label>
                <Input id="city" placeholder="Bordeaux" v-model="form.city" />
              </div>
            </div>
            <div class="mt-2 flex flex-1 flex-col gap-2">
              <Label for="legalEntity">Pays</Label>
              <Input id="country" placeholder="France" v-model="form.country" />
            </div>
          </div>

          <Button @click="handleClickClient" class="mt-3">Créer un nouveau Client</Button>
        </div>
        <div v-if="form.clientId > 0">
          <div class="flex items-end gap-4">
            <div class="mt-2 flex flex-1 flex-col gap-2">
              <Label for="name">Nom de l'étude</Label>
              <Input id="postCode" placeholder="Étude" v-model="form.nameProject" />
            </div>
            <div class="mt-2 flex flex-1 flex-col gap-2">
              <Label for="name">Acronyme de l'étude</Label>
              <Input id="postCode" placeholder="ETD" v-model="form.acronym" />
            </div>
          </div>

          <div class="flex items-end gap-4">
            <div class="flex flex-1 flex-col gap-2">
              <Label for="legalEntity">Date de Debut (Présent sur la CE)</Label>
              <DatePickerComponent v-model="startDateFormat" />
            </div>
            <div class="flex flex-1 flex-col gap-2">
              <Label for="legalEntity">Date de Fin (Présent sur la CE (à modifier en cas d'ACE))</Label>
              <DatePickerComponent v-model="endDateFormat" />
            </div>
          </div>
          <Button @click="handleClickProject" icon="edit" class="mt-3">Créer une nouvelle étude</Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import axios from 'axios'
import { useToast } from '@/components/ui/toast/use-toast'
import type { ProjectInfo } from '@/types/api'
import { type DateValue } from '@internationalized/date'

const form = ref<ProjectInfo>({
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
  activityField: '',

  function: '',
  firstContact: '',
  companyId: NaN,

  address: '',
  additionnalAddress: '',
  city: '',
  postCode: '',
  country: '',

  clientId: -1,
  acronym: '',
  startDate: '',
  endDate: '',
  projectId: 0,
  companyType: '',
  nameProject: ''
})

const endDateFormat = ref<DateValue>()
const startDateFormat = ref<DateValue>()

async function getDataClient(): Promise<{ value: string; label: string }[]> {
  // Fetch data from your API here.

  const clients = await axios.get(`/client`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const persons = await axios.get(`/person`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const clientsInfo = clients.data.data?.clients.map((client: any) => {
    const person = persons.data.data?.persons.find(
      (person: any) => person.personId === client.clientId
    )
    return {
      ...client,
      ...person
    }
  })

  const clientLists = clientsInfo.map((client: any) => {
    return {
      value: client.clientId.toString(),
      label: `${client.firstname} ${client.lastname}`
    }
  })

  return clientLists
}

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
      label: address.address
    }
  })

  return addressesLists
}

const handleInputCompany = (value: string) => {
  form.value.companyId = parseInt(value)
}

const handleInputClient = (value: string) => {
  form.value.clientId = parseInt(value)
}

const handleInputAddress = (value: string) => {
  form.value.addressId = parseInt(value)
}

const handleClickNewCompany = () => {
  form.value.companyId = 0
}

const handleClickNewClient = () => {
  form.value.clientId = 0
}

const handleClickNewAdress = () => {
  form.value.addressId = 0
}
const companyList = ref([] as { value: string; label: string }[]) // Initialisation d'une liste réactive vide

const clientsList = ref([] as { value: string; label: string }[]) // Initialisation d'une liste réactive vide
const addressList = ref([] as { value: string; label: string }[]) // Initialisation d'une liste réactive vide

onMounted(async () => {
  companyList.value = await getDataCompany()
  clientsList.value = await getDataClient()
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

async function newCompany() {
  await axios
    .post(
      `/company/`,
      {
        company: {
          name: form.value.name,
          legalEntity: form.value.legalEntity,
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
      form.value.companyId = response.data.data.companyId
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
      console.log(response)
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

async function newClient() {
  await axios
    .post(
      `/client/`,
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
    .then((response) => {
      console.log(response)
      form.value.clientId = response.data.data.clientId
      toast({
        title: 'Personne renseignée',
        description: `${response.data.data.clientId}`
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

async function newProject() {
  if (startDateFormat.value) {
    form.value.startDate = startDateFormat.value.toString()
  }
  if (endDateFormat.value) {
    form.value.endDate = endDateFormat.value.toString()
  }
  console.log(form.value.nameProject)
  await axios
    .post(
      `/project/`,
      {
        project: {
          clientId: form.value.clientId,
          startDate: form.value.startDate,
          endDate: form.value.endDate,
          acronym: form.value.acronym,
          name: form.value.nameProject
        }
      },
      {
        headers: {
          Authorization: `Bearer ${useAuthStore().token}`
        }
      }
    )
    .then((response) => {
      console.log(response)
      toast({
        title: 'Etude ajoutée',
        description: `${response.data.data.project}`
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

async function handleClickClient() {
  if (form.value.addressId == 0) {
    await newAddress()
  }
  if (form.value.companyId == 0) {
    await newCompany()
  }
  await newPerson()
  await newClient()
  handleInputClient(form.value.clientId.toString())
}
async function handleClickProject() {
  await newProject()
}
</script>
