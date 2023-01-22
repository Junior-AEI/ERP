<template>
  <v-table class="user">
    <thead>
      <tr>
        <th class="text-left">Nom</th>
        <th class="text-left">Prénom</th>
        <th class="text-left">Genre</th>
        <th class="text-left">Email</th>
        <th class="text-left">Promotion</th>
        <th class="text-left">Date de cotisation</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in users"
        :key="item.Nom"
      >
        <td>{{ item.Nom }}</td>
        <td>{{ item.Prénom }}</td>
        <td>{{ item.Genre }}</td>
        <td>{{ item.Email }}</td>
        <td>{{ item.Promotion }}</td>
        <td>{{ item.Date_cotisation }}</td>

      </tr>
    </tbody>
  </v-table>
</template>

<script  lang="ts">
  export default {
    data () {
      return {
        users: [
          {
            Nom: 'John',
            Prénom: 'bean',
            Genre: 'Male',
            Email: 'john@gmail.com',
            Promotion: 2022,
            Date_cotisation:'10/09/2022',
          },
          {
            Nom: 'Lolla',
            Prénom: 'ppp',
            Genre: 'Female',
            Email: 'lolla@gmail.com',
            Promotion: 2021,
            Date_cotisation:'10/12/2021',
          },
          {
            Nom: 'david',
            Prénom: 'bbb',
            Genre: 'Male',
            Email: 'david@gmail.com',
            Promotion: 2023,
            Date_cotisation:'10/01/2023',
          },
        ],
      }
    },
  }
</script>