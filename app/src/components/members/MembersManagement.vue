<template>
  <Wrapper class="flex-col">
    <Card>
      <CardHeader>
        <span class="material-symbols-outlined"> manage_accounts </span>
        <span class="text-accent">Gérer les membres</span>
      </CardHeader>
      <CardContent>
        <div>
          <div class="flex flex-col gap-3 md:flex-row">
            <Wrapper class="flex-2 flex-col">
              <div class="grid grid-cols-3 gap-8">
                <Button variant="outline"> Ajouter un membre</Button>
                <Button variant="outline"> Modifier la liste des postes</Button>
                <Button variant="outline"> Modifier la liste des pôles</Button>
              </div>
            </Wrapper>
          </div>
        </div>
      </CardContent>
    </Card>
  </Wrapper>
</template>
