// Work in progress

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
  <div class="flex flex-wrap items-start gap-2">
    <Elevated class="p-2" v-for="file in files" :key="file?.name">{{ file?.name }}</Elevated>
  </div>
</template>

<script setup lang="ts">
import Icon from '@/components/Icon.vue'
import { ref } from 'vue'

const props = defineProps({
  accept: {
    type: String,
    default: 'image/*'
  },
  acceptLabels: {
    type: String,
    default: 'PNG, JPG ou JPEG'
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

const files = ref<Array<null | File>>([])

const uploadFile = (event: any) => {
  const file = event.target.files[0]
  console.log(file)
  if (!file) {
    alert('Erreur Aucun fichier sélectionné')
    return
  }
  if (!file.type.match(props.accept)) {
    alert("Erreur Le fichier n'est pas du type attendu")
    return
  }
  if (file.size > props.maxFileSize * 10 ** 6) {
    alert('Erreur Le fichier est trop volumineux')
    return
  }
  files.value.push(file)
  //imagePreview.value = URL.createObjectURL(file.value);
}
</script>
