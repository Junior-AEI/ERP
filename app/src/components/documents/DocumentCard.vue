<template>
  <Card>
    <CardContent class="flex flex-1 flex-row items-center justify-between">
      <div class="flex flex-1 flex-row items-center gap-4">
        <Icon name="description" />
        <div class="flex flex-1 flex-col">
          <span class="text-accent"> {{ props.infos.type }}</span>
          <span class="text-muted-foreground"> {{ props.infos.name }}</span>
        </div>
      </div>
      <Button
        variant="outline"
        icon="visibility"
        @click="previewDocument(props.infos.documentId)"
      ></Button>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import axios from 'axios'
import { type ExtendedDocument } from '@/types/api'
import { useToast } from '../ui/toast'


const props = defineProps<{
  infos: ExtendedDocument
}>()

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
const { toast } = useToast()

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
        `${props.infos.name}.${getExtensionByMime(response.headers['content-type'])}`,
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
