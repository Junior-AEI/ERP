import Link from '../ui/link/Link.vue';
<template>
  <Wrapper class="flex-col">
    <Card>
      <CardHeader>
        <span class="material-symbols-outlined"> manage_accounts </span>
        <span class="text-accent">Gérer les membres</span>
      </CardHeader>
      <CardContent>
        <div>
          <div class="flex flex-wrap gap-3">
            <Link variant="outline" to="/members/new" class="flex-1 text-nowrap">
              Ajouter un membre</Link
            >
            <Button variant="outline" class="flex-1"> Modifier la liste des postes</Button>
            <Button variant="outline" class="flex-1"> Modifier la liste des pôles</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </Wrapper>
</template>
