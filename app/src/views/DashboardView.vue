<template>
  <main class="flex flex-1 flex-col gap-6">
    <Wrapper class="w-full">
      <Card></Card>
      <Card></Card>
      <Card></Card>
    </Wrapper>

    <div class="flex flex-col gap-3 md:flex-row">
      <Wrapper class="flex-2 flex-col">
        <h1 class="m-3 text-accent">Bonjour Hugo,</h1>
        <Card>
          <CardHeader>
            <Icon name="star" />
            <span class="text-accent"> Liens favoris </span>
          </CardHeader>
          <Button> Coucou </Button>
        </Card>
      </Wrapper>

      <div class="flex h-fit flex-1 flex-col gap-3">
        <Wrapper class="flex-col gap-3">
          <Card>
            <Button> Coucou </Button>
          </Card>
        </Wrapper>
        <Wrapper class="flex-col">
          <Card>
            <Button> Coucou </Button>
          </Card>
        </Wrapper>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts"></script>
