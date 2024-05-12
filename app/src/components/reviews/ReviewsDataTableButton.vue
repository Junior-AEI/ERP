<template>
  <div class="grid grid-cols-3 gap-2">
    <Button
      variant="outline"
      size="sm"
      class="text-xs"
      @click="reviewDocument(thisDocument.documentId)"
    >
      Relire
      <Icon name="open_in_new" class="ml-1" />
    </Button>
    <Button variant="outline" size="sm" @click="changeStatus('Relu')">
      <span class="material-symbols-outlined"> done </span></Button
    >
    <Button variant="destructive" size="sm" @click="changeStatus('A corriger')">
      <span class="material-symbols-outlined"> close </span></Button
    >
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import type { ExtendedDocument } from '@/types/api'

const props = defineProps<{
  item: ExtendedDocument // Document + DocumentType
}>()

const thisDocument = ref<ExtendedDocument>(props.item)

const getExtensionByMime = (mime: string) => {
  const mimeTypes: Record<string, string> = {
    'application/pdf': 'pdf',
    'image/jpeg': 'jpeg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/bmp': 'bmp',
    'image/webp': 'webp',
    'image/svg+xml': 'svg'
  }
  return mimeTypes[mime] || ''
}

const reviewDocument = (id: number) => {
  axios
    .get('/document/downloadById/' + id, {
      responseType: 'blob',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then((response) => {
      const file = new File(
        [response.data],
        `${thisDocument.value.name}_v${thisDocument.value.version}.${getExtensionByMime(
          response.headers['content-type']
        )}`,
        { type: response.headers['content-type'] }
      )
      window.open(URL.createObjectURL(file))
      return URL.createObjectURL(file)
    })
    .catch((error) => {
      console.error(error)
    })
}

const changeStatus = (newStatus: string) => {
  axios
    .put(
      `/document/${thisDocument.value.documentId}`,
      {
        document: {
          name: thisDocument.value.name,
          path: thisDocument.value.path,
          version: thisDocument.value.version,
          typeId: thisDocument.value.typeId,
          information: thisDocument.value.information,
          status: newStatus,
          authorId: thisDocument.value.authorId,
          createdAt: thisDocument.value.createdAt
        }
      },
      {
        headers: {
          Authorization: `Bearer ${useAuthStore().token}`
        }
      }
    )
    .then(() => {
      location.reload()
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>
