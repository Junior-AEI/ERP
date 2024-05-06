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
        <Button class="w-full"> Téléverser un document</Button>
      </CardFooter>
    </Card>
  </Wrapper>
</template>

<script lang="ts"></script>
