<template>
  <div class="flex w-20 flex-col py-3">
    <div class="flex flex-1 flex-col items-center gap-2">
      <Button icon="menu" variant="link" class="text-xl" @click="$emit('expand')"></Button>
      <Link to="/" icon="dashboard" :variant="matchRoute('/')"></Link>
      <Button icon="search" variant="link" class="text-xl" @click="$emit('search')"></Button>
      <Link to="/documents" icon="folder" :variant="matchRoute('/documents')"></Link>
      <Link to="/membres" icon="group" :variant="matchRoute('/membres')"></Link>
      <Link to="/etudes" icon="work" :variant="matchRoute('/etudes')"></Link>
      <Link to="/tresorerie" icon="savings" :variant="matchRoute('/tresorerie')"></Link>
      <Link to="/evenements" icon="event" :variant="matchRoute('/evenements')"></Link>
      <Link to="/administration" icon="build" :variant="matchRoute('/administration')"></Link>
    </div>

    <div class="flex flex-col items-center gap-2">
      <Link
        to="/demander-une-note-de-frais"
        icon="savings"
        :variant="matchRoute('/demander-une-note-de-frais')"
      ></Link>
      <Link to="/support" icon="support_agent" :variant="matchRoute('/support')"></Link>
      <Button icon="logout" variant="link" class="text-xl" @click="$emit('logout')"></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(['expand', 'search', 'logout'])

import useMatchRoute from '@/composables/useMatchRoute'

const matchRoute = (route: string) => (useMatchRoute(route) ? 'active' : 'default')
</script>
