<template>
  <div>
    <Wrapper>
      <Card class="w-full">
        <CardHeader>
          <Icon name="receipt_long" />
          <span class="text-accent">Demande de Note de Frais</span>
        </CardHeader>
        <CardContent>
          <div class="flex flex-col gap-2">
            <Label for="title">Raison </Label>
            <Input
              v-model="form.reason"
              id="title"
              placeholder="Décrivez briévement la raison de la Note de Frais (ex : Lettre recommandée pour PV d'AG)"
            />
          </div>
          <div class="w-auto">
            <DatePickerComponent v-model="expenseDateFormat" />
          </div>

          <div class="flex flex-col gap-2">
            <Label for="application"
              >Qui a approuvé la dépense ? (Forcément un membre du CA différent de toi)</Label
            >
            <Combobox
              @input="handleInput"
              :options="approbatorList"
              :comboboxLabel="'Selectionner l\'approbateur'"
            ></Combobox>
          </div>
          <div class="flex flex-col gap-2">
            <Label for="description">Description</Label>
            <Textarea
              v-model="form.description"
              id="description"
              placeholder="Donnez l'ensemble des informations utiles à l'élaboration de la Note de Frais (Votre RIB, Immatriculation, Raison précise, ...)"
            />
          </div>
          <div class="flex flex-col gap-2">
            <Label for="file"
              >Ajouter l'ensemble des justificatifs (Factures au nom de Aquitaine Electronique
              Informatique, justificatifs de payements ) <br />
              ATTENTION ces justificatifs si reçu en papier doivent être conservés au format papier
              et fourni sous ce format au Pole Trésorerie
            </Label>
            <Dropzone v-model="files" :multiple="true" />
          </div>
        </CardContent>

        <CardFooter>
          <Button @click="handleClick">Envoyer ma demande</Button>
        </CardFooter>
      </Card>
    </Wrapper>
    <Toaster />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import type { ExpenseAccount } from '@/types/api'
import { type DateValue } from '@internationalized/date'
import { useToast } from '@/components/ui/toast/use-toast'
import { Toaster } from '@/components/ui/toast'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const handleInput = (value: string) => {
  form.value.approbatorId = parseInt(value)
}

const user = useAuthStore()

const expenseDateFormat = ref<DateValue>()
const form = ref<ExpenseAccount>({
  expenseId: NaN,
  userId: user.userId,
  approbatorId: NaN,
  reason: '',
  expenseDate: '',
  description: '',
  state: ''
})

async function getData(): Promise<{ value: string; label: string }[]> {
  // Fetch data from your API here.

  const belongers = await axios.get(`/belonger`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const persons = await axios.get(`/person`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const groups = await axios.get(`/group`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const belongersData = belongers.data.data?.belongers
  const personsData = persons.data.data?.persons
  const groupsData = groups.data.data?.groups

  const NumGroupBureau = groupsData.filter((group: any) => group.groupName === 'Bureau')

  const bureauGroup = NumGroupBureau.map((group: any) => {
    const belonger = belongersData.find((belonger: any) => belonger.groupId === group.groupId)
    return {
      ...belonger
    }
  })

  const bureauPersons = bureauGroup.map((belonger: any) => {
    const person = personsData.find((person: any) => person.personId === belonger.userId)
    return {
      value: person.personId.toString(),
      label: `${person.firstname} ${person.lastname}`
    }
  })

  return bureauPersons
}

const approbatorList = ref([] as { value: string; label: string }[]) // Initialisation d'une liste réactive vide

onMounted(async () => {
  approbatorList.value = await getData()
})
const files = ref<File[]>([])

const { toast } = useToast()

const handleClick = () => {
  // Crée un objet pour envoyer en requête
  if (expenseDateFormat.value) {
    form.value.expenseDate = expenseDateFormat.value.toString()
  }
  axios
    .post(
      `/expenseAccount/`,
      {
        expenseAccount: {
          userId: form.value.userId,
          reason: form.value.reason,
          approbatorId: form.value.approbatorId,
          expenseDate: form.value.expenseDate,
          description: form.value.description
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
        title: 'Demande envoyée',
        description: `${form.value.reason}`
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
</script>
