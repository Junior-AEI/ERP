<template>
  <div>
    <Wrapper>
      <Card class="w-full">
        <CardHeader>
          <Icon name="support_agent" />
          <span class="text-accent">Ticket à la DSI</span>
        </CardHeader>
        <CardContent>
          <div class="flex flex-col gap-2">
            <Label for="title">Titre</Label>
            <Input id="title" placeholder="Décrivez brièvement le problème" />
          </div>
          <div class="flex flex-col gap-2">
            <Label for="application">Application concernée</Label>
            <Combobox
              id="application"
              :options="appList"
              comboboxLabel="Selectionner l'application concernée"
            ></Combobox>
          </div>
          <div class="flex flex-col gap-2">
            <Label for="description">Description</Label>
            <Textarea id="description" placeholder="Décrivez brièvement le problème" />
          </div>
        </CardContent>

        <CardFooter>
          <Button>Envoyer ma demande</Button>
        </CardFooter>
      </Card>
    </Wrapper>
  </div>
</template>

<script setup lang="ts">
const appList = [
  { value: 'erp', label: 'ERP' },
  { value: 'passbolt', label: 'Passbolt' }
]
</script>
