<template>
    <div class="about">
        <h3>Les Adhérents d'AEI  </h3>
    </div>
    <table class="table"  id="user">
        <thead>
          <tr>
            <th scope="col">Promotion</th>
            <th scope="col">Identifiant</th>
            <th scope="col">Prénom</th>
            <th scope="col">Nom</th>
            <th scope="col">Poste</th>
            <th scope="col">Email</th>
            <th scope="col">Adresse</th>
          </tr>
        </thead>
        <tbody>
            <tr>
            <th scope="row">ABID</th>
            <td>Nesrine</td>
            <td>abid.nesrine52@gmail.com</td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
  export default {
    name: "UsersList.vue",
  }
</script>

<style scoped lang="scss">
@media (min-width: 1024px) {
    #user {
        min-height: 100vh;
        align-items: center;
        width: 70%;
        margin: 2em;
    }
}
</style>