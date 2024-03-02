<template>
  <div class="flex w-full flex-col gap-3 border-r bg-primary-foreground px-6 py-5 sm:w-80">
    <div class="flex w-full justify-between">
      <h3>Hugo Bastien</h3>
      <Icon name="chevron_left" variant="clickable" @click="$emit('close')" />
    </div>

    <Input v-model="search" placeholder="Rechercher" />
  </div>
</template>

<script setup lang="ts">
defineEmits(['close'])

import { ref } from 'vue'

const search = ref('')
</script>
