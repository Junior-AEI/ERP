<template>
  <div class="flex w-full flex-col gap-3 border-r bg-primary-foreground px-6 py-5 sm:w-80">
    <div class="flex w-full justify-between">
      <Link to="/profil" icon="person" :variant="matchRoute('/profil')">Hugo Bastien</Link>
      <Button icon="chevron_left" size="icon" variant="link" @click="$emit('close')"></Button>
    </div>

    <Input v-model="search" placeholder="Rechercher" />
  </div>
</template>

<script setup lang="ts">
defineEmits(['close'])

import { ref } from 'vue'

const search = ref('')

import useMatchRoute from '@/composables/useMatchRoute'

const matchRoute = (route: string) => (useMatchRoute(route) ? 'active' : 'default')
</script>
