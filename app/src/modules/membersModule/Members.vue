<template>
  <div>
    <div class="flex flex-row items-center gap-4">
      <div>
        <h1>Liste des Membres</h1>
      </div>
      <Link variant="outline" to="/clients/new" class="w-60"> Ajouter un membre</Link>
    </div>

    <div>
      <MembersTable />
    </div>
  </div>
</template>

<script lang="ts" setup></script>
