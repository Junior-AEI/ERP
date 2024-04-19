<template>
  <Card>
    <h2>Tâches à effectuer</h2>
    <div>
      <Task> </Task>
    </div>
    <div>
      <h3>Ajouter une tâche :</h3>
      <div>
        <Input type="text" placeholder="ma tâche" />
        <div class="flex-col">
          <Input type="date" placeholder="Deadline" />
          <Button> Ajouter </Button>
        </div>
      </div>
    </div>
  </Card>
</template>
