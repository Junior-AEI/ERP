<template>
  <div>
    <div>
      <h1>Ajouter un nouveau document</h1>
    </div>
    <div><DocumentsAdd @update:files="updatedFiles" /></div>
    <div>
      <h1>Consulter et éditer mes documents</h1>
      <DocumentsTable @reloaded="reloaded" :need-reload="needReload" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const needReload = ref(false)

const updatedFiles = () => {
  needReload.value = true
}

const reloaded = () => {
  needReload.value = false
}
</script>
