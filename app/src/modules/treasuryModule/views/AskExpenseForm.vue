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
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import type { ExpenseAccountWithDoc, Document, DocumentType } from '@/types/api'
import { type DateValue } from '@internationalized/date'
import { useToast } from '@/components/ui/toast/use-toast'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const handleInput = (value: string) => {
  form.value.approbatorId = parseInt(value)
}

const user = useAuthStore()

const expenseDateFormat = ref<DateValue>()
const form = ref<ExpenseAccountWithDoc>({
  expenseId: NaN,
  userId: user.userId,
  approbatorId: NaN,
  reason: '',
  expenseDate: '',
  description: '',
  state: '',
  documentList : []
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

  const NumGroupBureau = groupsData.find((group: any) => group.groupName === 'Bureau')

  const belongerBureau = belongersData.filter((belonger: any) => belonger.groupId === NumGroupBureau.groupId)

  const belongerBureauWithoutUser = belongerBureau.filter((belonger: any) => belonger.userId != user.userId)


  const bureauPersons = belongerBureauWithoutUser.map((belonger: any) => {
    console.log(belonger)
    const person = personsData.find((person: any) => person.personId === belonger.userId)
    console.log(person)
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

const addExpenseAccount = async() => {
  // Crée un objet pour envoyer en requête
  if (expenseDateFormat.value) {
    form.value.expenseDate = expenseDateFormat.value.toString()
  }
  await axios
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
      form.value.expenseId = response.data.data.expenseId
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





const uploadDocument = (i : number) => {
  
const documentInfos = ref<Document>({
  documentId : NaN,
  name: '',
  path: '',
  version: 1,
  typeId: NaN,
  information: '',
  status: 'Sans Relecture',
  authorId: user.userId,
  createdAt: '',
})
console.log(files.value[i].name)
const removeExtension = (filename: string): string => {
  return filename.split('.').slice(0, -1).join('.')
}
axios
  .post(
    `/document`,
    {
      document: {
        name: removeExtension(files.value[i].name),
        version: documentInfos.value.version,
        typeId:
          documentTypes.value.find(
            (documentType: any) => documentType.type === "Doc lié à une Demande de Note de Frais"
          )?.typeId ?? 0, // should not be equal to 0
        information: form.value.expenseId.toString(),
        status: documentInfos.value.status,
        authorId: documentInfos.value.authorId,
      },
      file: files.value[i]
    },
    {
      headers: {
        Authorization: `Bearer ${useAuthStore().token}`,
        'Content-Type': 'multipart/form-data'
      }
    }
  )
  .then(() => {
    toast({
      title: 'Document envoyé',
      description: `Le document a été envoyé avec succès.`
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

async function getDocumentType(): Promise<DocumentType[]> {
  const response = await axios.get(`/documentType`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })
  return response.data.data.documentTypes
}

const documentTypes = ref<DocumentType[]>([])

onMounted(async () => {
  documentTypes.value = await getDocumentType()
})

async function handleClick() {
  await addExpenseAccount()
  if (files.value) {
    for (let i = 0; i < files.value.length; i++) { 
      await uploadDocument(i)
    }
    
  }
  clearFields()
}

const clearFields = () => {
  form.value.expenseId = NaN,
  form.value.approbatorId = NaN,
  form.value.reason = '',
  form.value.expenseDate = '',
  form.value.description = '',
  form.value.state = '',
  form.value.documentList = [],
  files.value = [];


}
</script>
