<template>
  <div class="flex w-full flex-col gap-5 border-r bg-primary-foreground px-6 py-5 sm:w-80">
    <div class="flex w-full justify-between">
      <h3>Hugo Bastien</h3>
      <Icon name="chevron_left" variant="clickable" @click="$emit('reduce')" />
    </div>

    <Input @click="$emit('search')" placeholder="Rechercher" />
  </div>
</template>

<script setup lang="ts">
defineEmits(['reduce', 'search'])
</script>
