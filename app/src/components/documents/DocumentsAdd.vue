<template>
  <Wrapper class="flex-col">
    <Card>
      <CardHeader>
        <span class="material-symbols-outlined"> create_new_folder </span>
        <span class="text-accent">Téléverser un document</span>
      </CardHeader>
      <CardContent class="grid gap-4">
        <Dropzone />
      </CardContent>
      <CardFooter>
        <Button class="w-full" @click="uploadDocument()"> Téléverser un document</Button>
      </CardFooter>
    </Card>
  </Wrapper>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

const uploadDocument = () => {
  console.log('TODO\n')
}
</script>
