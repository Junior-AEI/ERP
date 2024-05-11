<template>
  <div>
    <div>
      <h1>Liste des Clients</h1>
    </div>
    <Link variant="outline" to="/clients/new" class="w-60"> Ajouter un client</Link>
    <div>
      <ProjectTable />
    </div>
  </div>
</template>

<script lang="ts" setup></script>
