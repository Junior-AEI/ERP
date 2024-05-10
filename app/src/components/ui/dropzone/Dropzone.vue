<script setup lang="ts">
import { computed } from 'vue'
import { useToast } from '../toast'

const { toast } = useToast()

const props = defineProps({
  accept: {
    type: String,
    default: '.pdf, .png, .jpg, .jpeg'
  },
  acceptLabels: {
    type: String,
    default: 'PDF, PNG, JPG ou JPEG uniquement'
  },
  multiple: {
    type: Boolean,
    default: false
  },
  maxFileSize: {
    type: Number,
    default: 20 // in MB
  },
  firstLine: {
    type: String,
    default: 'Cliquez pour déposer le fichier'
  }
})

const files = defineModel<File[]>({
  required: true
})

const generatePreview = (file: File) => {
  return URL.createObjectURL(file)
}

const preview = (file: File) => {
  window.open(generatePreview(file))
}

const isImageList = computed(() => {
  return files.value.every((file) => file.type.includes('image'))
})

const uploadFile = (event: any) => {
  const file = event.target.files[0]
  if (!file) {
    console.log('No file selected')
    toast({
      title: 'Erreur',
      variant: 'destructive',
      description: 'Aucun fichier sélectionné'
    })
    return
  }
  if (file.size > props.maxFileSize * 10 ** 6) {
    toast({
      title: 'Erreur',
      variant: 'destructive',
      description: 'Le fichier est trop volumineux'
    })
    return
  }
  if (!props.multiple) {
    files.value.pop()
  }
  files.value.push(file)
  //imagePreview.value = URL.createObjectURL(file.value)
}
</script>

<template>
  <div class="flex w-full items-center justify-center">
    <label
      for="dropzone-file"
      class="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-primary-foreground p-2 transition-all duration-200 hover:bg-muted"
    >
      <div class="flex flex-col items-center justify-center gap-2 pb-6 pt-5">
        <div class="m-0 text-2xl">
          <Icon name="cloud_upload" />
        </div>
        <div class="flex flex-col gap-2 text-center text-sm text-primary">
          <span class="font-bold">{{ firstLine }}</span>
          <span class="text-xs text-secondary-foreground"
            >{{ acceptLabels }} (MAX. {{ maxFileSize }}MB)</span
          >
        </div>
      </div>
    </label>
  </div>
  <input
    id="dropzone-file"
    type="file"
    class="hidden"
    :accept="accept"
    @change="
      (e) => {
        uploadFile(e)
      }
    "
    @drop="
      (e) => {
        uploadFile(e)
      }
    "
  />
  <div
    class="flex flex-wrap items-start gap-1 rounded-md bg-muted p-1"
    v-if="files.length > 0"
    v-auto-animate
  >
    <Elevated
      class="flex items-center justify-center gap-2 p-2 text-sm"
      v-for="file in files"
      :key="file?.name"
    >
      <div class="flex w-full cursor-pointer flex-col gap-2" @click="preview(file)">
        <img
          v-if="isImageList"
          :src="generatePreview(file)"
          @click="preview(file)"
          class="h-fit max-h-20 w-fit rounded-md bg-red-300 object-scale-down"
        />
        <span class="font-medium">
          {{ file?.name }}
        </span>
      </div>
      <Icon
        name="close"
        class="cursor-pointer pt-1"
        @click="files = files.filter((f) => f !== file)"
      />
    </Elevated>
  </div>
</template>
