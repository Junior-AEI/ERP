<template>
  <div>
    <Card class="max-w-2xl flex-1">
      <CardHeader>
        <Icon name="person_add" class="text-6xl" />
        <span class="text-accent"> Ajouter un utilisateur</span>
      </CardHeader>
      <CardContent>
        <div class="flex items-end gap-4" v-if="form.memberId == -1">
          <div class="flex flex-1 flex-col gap-2">
            <Combobox
              @input="handleInputMember"
              :options="membersList"
              :comboboxLabel="'Selectionner un membre existant'"
            >
            </Combobox>
            <Button variant="outline" @click="handleClickNewMember"
              >Rentrer un nouveau membre</Button
            >
          </div>
        </div>

        <div v-if="form.memberId == 0">
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
              <Label for="birthDate">Date de naissance</Label>
              <DatePickerComponent v-model="birthDateFormat" />
            </div>
            <div class="flex flex-1 flex-col gap-2">
              <Label for="birthPlace">Lieu de naissance</Label>
              <Input id="birthPlace" v-model="form.birthPlace" />
            </div>
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <Label for="nationality">Nationalité</Label>
            <Input id="nationality" v-model="form.nationality" />
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
              <Input id="mobilePhone" placeholder="Info" v-model="form.mobilePhone" />
            </div>
            <div class="flex flex-1 flex-col gap-2">
              <Label for="landlinePhone">N° de Téléphone</Label>
              <Input id="landlinePhone" placeholder="Tel Fixe" v-model="form.landlinePhone" />
            </div>
          </div>
          <div class="flex flex-1 flex-col gap-2">
            <Label for="landlinePhone">Email</Label>
            <Input id="landlinePhone" placeholder="Tel Fixe" v-model="form.email" />
          </div>
          <div class="flex items-end gap-4">
            <div class="flex justify-end gap-4">
              <div class="flex flex-1 flex-col gap-2">
                <Label for="membershipNumber">Numéro de cotisation</Label>
                <Input id="membershipNumber" v-model="membershipNumberFormat" />
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
          </div>
          <div class="flex justify-end gap-4">
            <div class="flex flex-1 flex-col gap-2">
              <Label for="membershipNumber">@Telegram</Label>
              <Input id="membershipNumber" v-model="form.telegramId" />
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
          </div>

          <div v-if="form.addressId == 0">
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
          </div>
          <Button @click="handleClickMember" class="mt-4">Créer le nouveau Membre</Button>
        </div>

        <div v-if="form.memberId != 0 && form.memberId != -1">
          <div class="flex items-end gap-4">
            <div class="flex flex-1 flex-col gap-2">
              <Label for="mandateStart">Debut de Mandat</Label>
              <Input id="mandateStart" v-model="form.mandateStart" />
            </div>
            <div class="flex flex-1 flex-col gap-2">
              <Label for="firstname">Fin de Mandat</Label>
              <Input id="firstname" v-model="form.mandateEnd" />
            </div>
          </div>
          <div class="flex items-end gap-4">
            <div class="flex flex-1 flex-col gap-2">
              <Label for="lastname">Nom d'utilisateur </Label>
              <Input id="lastname" v-model="form.username" />
            </div>
            <div class="flex flex-1 flex-col gap-2">
              <Label for="firstname">Email à AEI </Label>
              <Input id="firstname" v-model="form.emailJE" />
            </div>
            <div class="flex flex-1 flex-col gap-2">
              <Label for="firstname">Mot de Passe ERP</Label>
              <Input id="firstname" v-model="form.password" />
            </div>
          </div>
          <Button @click="handleClickUser" class="mt-4">Créer un nouvel Utilisateur</Button>
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
const temp = ref('temp')
import type { FullUserWithAdress } from '@/types/api'
import { type DateValue } from '@internationalized/date'
import CardContent from '@/components/ui/card/CardContent.vue'

const form = ref<FullUserWithAdress>({
  personId: NaN,
  lastname: '',
  firstname: '',
  gender: '',
  mobilePhone: '',
  landlinePhone: '',
  email: '',

  memberId: -1,
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
  updatedAt: '',

  userId: NaN,
  username: '',
  mandateStart: '',
  mandateEnd: '',
  emailJE: '',
  password : ''
})

const membershipNumberFormat = ref<string>()
const contributionDateFormat = ref<DateValue>()
const birthDateFormat = ref<DateValue>()

const handleInputAddress = (value: string) => {
  form.value.addressId = parseInt(value)
}

const handleInputMember = (value: string) => {
  form.value.memberId = parseInt(value)
  getDataMemberSelected(form.value.memberId)
}

async function getDataMemberSelected(memberId: number) {
  // Fetch data from your API here.

  const person = await axios.get(`/person/${memberId}`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  form.value.username = `${person.data.data?.person.firstname.toLowerCase()}.${person.data.data?.person.lastname.toLowerCase()}`
  form.value.emailJE = `${person.data.data?.person.firstname.toLowerCase()}.${person.data.data?.person.lastname.toLowerCase()}@junior-aei.com`
}
async function getDataMembers(): Promise<{ value: string; label: string }[]> {
  // Fetch data from your API here.

  const members = await axios.get(`/member/`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const persons = await axios.get(`/person`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const MembersPerson =  members.data.data?.members.map((member: any) => {
    const person = persons.data.data?.persons.find(
      (person: any) => person.personId === member.memberId
    )
    return {
      ...person,
      ...member
    }
  })
  const users = await axios.get(`/user`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })
  console.log(users.data.data?.users) 


  const UsersMembers =  users.data.data?.users.map((user: any) => {
    const member = members.data.data?.members.find(
      (member: any) => user.userId === member.memberId
    )
    return {
      ...user,
      ...member
    }
  })
  console.log(UsersMembers) 
  const nonUserMembers = MembersPerson.filter((member: any) => {
    return !UsersMembers.some((user: any)  => user.userId == member.memberId);
  });

  const membersLists = nonUserMembers.map((member: any) => {
    return {
      value: member.memberId.toString(),
      label: `${member.firstname} ${member.lastname}`
    }
  })
  console.log(membersLists) 

  return membersLists;

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
const membersList = ref([] as { value: string; label: string }[]) // Initialisation d'une liste réactive vide

const handleClickNewAdress = () => {
  form.value.addressId = 0
}

const handleClickNewMember = () => {
  form.value.memberId = 0
}

onMounted(async () => {
  addressList.value = await getDataAddress()
  membersList.value = await getDataMembers()
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
  birthDateFormat
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
      form.value.memberId = response.data.data.memberId

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

async function newUser() {
  await axios
    .post(
      `/user/`,
      {
        user: {
          userId: form.value.memberId,
          username: form.value.username,
          mandateStart: form.value.mandateStart,
          mandateEnd: form.value.mandateEnd,
          emailJE: form.value.emailJE,
          password: form.value.password

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
        title: 'Utilisateur renseigné',
        description: `${response.data.data.userId}`
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
async function handleClickMember() {
  if (form.value.addressId == 0) {
    await newAddress()
  }
  if (form.value.memberId == 0) {
    await newPerson()

    await newMember()
  }
  handleInputMember(form.value.memberId.toString())
}

async function newPassword() {
  await axios
    .post(
      `/forget`,
      {
          username: form.value.username,

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
        title: 'Utilisateur renseigné',
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
async function handleClickUser() {
  await newUser()
  await newPassword()
}
</script>
