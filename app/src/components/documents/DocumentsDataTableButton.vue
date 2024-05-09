<template>
  <div class="gap-1">
    <div>
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="outline" @click="openDialog()">
            <span class="material-symbols-outlined"> description </span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Détails sur le document</DialogTitle>
          </DialogHeader>
          <div class="grid-col-1 grid gap-2" v-for="(item, index) in combinedArray" :key="index">
            <h3>{{ item.title }}</h3>
            <h4>{{ item.subtitle }}</h4>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    <div>
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="outline" @click="openDialog()">
            <span class="material-symbols-outlined"> edit </span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Éditer le document</DialogTitle>
          </DialogHeader>
          <div gap-2>
            <Label> Téléverser une nouvelle version (optionel) </Label>
            <Dropzone v-model="files" />
          </div>
          <div class="grid grid-cols-2 gap-2">
            <Label>Type de document</Label>
            <Label> Version du document </Label>
            <Input disabled v-model="thisDocument.type" />
            <Input type="number" v-model="version" placeholder="2" />
          </div>
          <div v-for="(field, index) in thisDocument.fieldMeaning.split('|')" :key="index">
            <div class="flex-col gap-2">
              <Label>{{ field }}</Label>
              <Input v-if="field != 'Date de fin de validité'" v-model="infos[index]" />
              <Input
                v-else
                type="date"
                v-model="infos[index]"
                placeholder="Date de fin de validité"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="destructive" @click="deleteDocument()">Supprimer le document</Button>
            <Button @click="editDocument()">Enregistrer les modifications</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    <div>
      <Button variant="outline">
        <span class="material-symbols-outlined"> download </span>
        <DocumentDownload />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import { ref } from 'vue'
import type { DocumentFull } from '@/types/api'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

const props = defineProps<{
  item: DocumentFull // Document + DocumentType
}>()

const files = ref<File[]>([])
const thisDocument = ref<DocumentFull>(props.item)
const version = ref(thisDocument.value.version + 1)
const infos = ref(thisDocument.value.information.split('|'))
const fieldMeaningArray = thisDocument?.value.fieldMeaning.split('|') ?? []
const informationArray = thisDocument?.value.information.split('|') ?? []
const combinedArray = fieldMeaningArray.map((title, index) => {
  let subtitle = informationArray[index] || ''
  // Vérifie si 'subtitle' est une date au format 'YYYY-MM-DD'
  const datePattern = /^\d{4}-\d{2}-\d{2}$/
  if (datePattern.test(subtitle)) {
    const date = new Date(subtitle)
    subtitle = date.toLocaleDateString()
  }
  return {
    title,
    subtitle
  }
})

// to be fixed : must update the associated file
const editDocument = () => {
  // axios
  //   .put(
  //     `/document/${thisDocument.value.documentId}`,
  //     {
  //       document: {
  //         path: thisDocument.value.path,
  //         version: version.value,
  //         typeId: thisDocument.value.typeId,
  //         information: infos.value.join('|'),
  //         status: 'A relire',
  //         authorId: thisDocument.value.authorId
  //       }
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${useAuthStore().token}`
  //       }
  //     }
  //   )
  //   .then((response) => {
  //     console.log(response)
  //     location.reload()
  //   })
  //   .catch((error) => {
  //     console.error(error)
  //   })
}

// to be fixed : must delete the associated file
const deleteDocument = () => {
  // axios
  //   .delete(`/document/${thisDocument.value.documentId}`, {
  //     headers: {
  //       Authorization: `Bearer ${useAuthStore().token}`
  //     }
  //   })
  //   .then((response) => {
  //     console.log(response)
  //     location.reload()
  //   })
  //   .catch((error) => {
  //     console.error(error)
  //   })
}

const openDialog = () => {
  console.log(thisDocument.value)
}
</script>
