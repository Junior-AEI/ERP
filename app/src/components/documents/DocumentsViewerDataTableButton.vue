<template>
  <div class="flex gap-1">
    <div>
      <Button variant="outline" size="sm" class="text-xs" @click="previewDocument(item.documentId)">
        {{item.name}}
        <Icon name="open_in_new" class="ml-1" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import type { Document } from '@/types/api'
import { useAuthStore } from '@/stores/authStore'
import { useToast } from '../ui/toast'

const props = defineProps<{
  item: Document // Document + DocumentType
}>()

const { toast } = useToast()

const thisDocument = ref<Document>(props.item)




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



const previewDocument = (id: number) => {
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
        `${thisDocument.value.name}.${getExtensionByMime(response.headers['content-type'])}`,
        { type: response.headers['content-type'] }
      )
      window.open(URL.createObjectURL(file))
      return URL.createObjectURL(file)
    })
    .catch((error) => {
      toast({
        title: 'Erreur lors du téléchargement',
        variant: 'destructive',
        description: error
      })
    })
}
</script>
