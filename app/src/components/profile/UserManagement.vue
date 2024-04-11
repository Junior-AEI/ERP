<template>
  <Wrapper class="max-w-2xl flex-col gap-3">
    <Card class="flex-1">
      <CardHeader>
        <Icon name="settings" class="text-6xl" />
        <span class="text-accent"> Données personnelles </span>
      </CardHeader>
      <CardContent>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="lastname">Réinitialiser le mot de passe</Label>
          <Button class="w-full" variant="outline" @click="resetPassword">
            Envoyer un email de réinitialisation de mot de passe
          </Button>
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="lastname">Téléchargement des données de l'utilisateur</Label>
          <Button class="w-full" variant="outline" @click="downloadUserData">
            Télécharger les données de l'utilisateur
          </Button>
        </div>
      </CardContent>
    </Card>
    <Card class="flex-1 border-destructive">
      <CardHeader class="border-destructive text-destructive">
        <Icon name="warning" class="text-6xl" />
        <span> Zone à risques </span>
      </CardHeader>
      <CardContent>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="lastname">Supprimer le compte utilisateur lié à ce profil</Label>
          <span class="text-sm text-muted-foreground">
            Le compte de cet utilisateur sera supprimé donc il ne pourra plus accéder à l’ERP mais
            ses informations seront conservées
          </span>
          <Button class="w-full" variant="destructive" @click="deleteAccount">
            Supprimer ce compte
          </Button>
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <Label for="lastname">Supprimer ce profil</Label>
          <span class="text-sm text-muted-foreground">
            Le profil de cette personne sera supprimé ainsi que son compte utilisateur si elle en
            possède un.
          </span>
          <Button class="w-full" variant="destructive" @click="deleteProfile">
            Supprimer ce profil
          </Button>
        </div>
      </CardContent>
    </Card>
  </Wrapper>
</template>

<script setup lang="ts">
const resetPassword = () => {
  alert('à implémenter !')
}

const downloadUserData = () => {
  alert('à implémenter !')
}

const deleteAccount = () => {
  alert('à implémenter !')
}

const deleteProfile = () => {
  alert('à implémenter !')
}
</script>
