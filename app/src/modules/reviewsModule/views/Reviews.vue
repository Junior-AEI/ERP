<template>
  <div>
    <ReviewsDashboard @reloaded="reloaded" :need-reload="needReload" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const needReload = ref(false)

const reloaded = () => {
  needReload.value = false
}
</script>
