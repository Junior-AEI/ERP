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
      <Button variant="outline" icon="visibility"></Button>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { type ExtendedDocument } from '@/types/api'

const props = defineProps<{
  infos: ExtendedDocument
}>()
</script>
