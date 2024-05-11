<template>
  <div class="flex gap-1">
    <div>
      <Button
        variant="outline"
        size="sm"
        class="text-xs"
        @click="downloadDocument(item.documentId)"
      >
        Visualiser
        <Icon name="open_in_new" class="ml-1" />
      </Button>
    </div>
    <Select>
      <SelectTrigger class="h-9 w-fit gap-1 rounded-md"> </SelectTrigger>
      <SelectContent>
        <div class="flex flex-col">
          <Dialog>
            <DialogTrigger as-child>
              <Button variant="ghost" size="sm" class="w-full justify-start text-xs">
                <Icon name="edit" class="mr-1" />
                Modifier
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
                <Button variant="destructive" @click="deleteDocument()"
                  >Supprimer le document</Button
                >
                <Button @click="editDocument()">Enregistrer les modifications</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger as-child>
              <Button variant="ghost" size="sm" class="w-full justify-start text-xs">
                <Icon name="description" class="mr-1" />
                Détails sur document
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Détails sur le document</DialogTitle>
              </DialogHeader>
              <div
                class="grid-col-1 grid gap-2"
                v-for="(item, index) in combinedArray"
                :key="index"
              >
                <h3>{{ item.title }}</h3>
                <h4>{{ item.subtitle }}</h4>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </SelectContent>
    </Select>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import type { DocumentFull } from '@/types/api'
import { useAuthStore } from '@/stores/authStore'

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
  axios
    .put(
      `/document/${thisDocument.value.documentId}`,
      {
        document: {
          path: thisDocument.value.path,
          version: version.value,
          typeId: thisDocument.value.typeId,
          information: infos.value.join('|'),
          status: 'A relire',
          authorId: thisDocument.value.authorId
        },
        file: files.value[0]
      },
      {
        headers: {
          Authorization: `Bearer ${useAuthStore().token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    .then((response) => {
      console.log(response)
      //location.reload()
    })
    .catch((error) => {
      console.error(error)
    })
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

const downloadDocument = (id: number) => {
  axios
    .get('/document/downloadById/' + id, {
      responseType: 'blob',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then((response) => {
      const file = new Blob([response.data], { type: response.headers['content-type'] })
      window.open(URL.createObjectURL(file))
      return URL.createObjectURL(file)
    })
}
const openDialog = () => {
  console.log(thisDocument.value)
}
</script>
