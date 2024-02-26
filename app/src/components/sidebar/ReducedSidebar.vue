<template>
  <div class="flex w-20 flex-col py-3">
    <div class="flex flex-1 flex-col items-center gap-2">
      <Icon name="menu" variant="clickable" @click="$emit('expand')" />
      <RouterLink to="/">
        <Icon name="dashboard" variant="clickable" />
      </RouterLink>
      <Icon name="search" variant="clickable" class="cursor-pointer" @click="$emit('search')" />
      <Icon name="folder" variant="clickable" />
      <Icon name="group" variant="clickable" />
      <Icon name="work" variant="clickable" />
      <Icon name="savings" variant="clickable" />
      <Icon name="event" variant="clickable" />
      <Icon name="build" variant="clickable" />
    </div>

    <div class="flex flex-col items-center gap-2">
      <Icon name="savings" variant="clickable" />
      <Icon name="support_agent" variant="clickable" />
      <RouterLink to="/logout">
        <Icon name="logout" variant="clickable" />
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(['expand', 'search'])
</script>
