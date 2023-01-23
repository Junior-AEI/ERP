<template>
    <div class="d-xl-flex align-center flex-column">
    <v-sheet class="ma-8 pa-8">
        <v-card
        width="600"
        class="mx-auto"
        >
        <v-form
        ref="form"
        v-model="valid"
        lazy-validation 
        class="container"
        >
        <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
        ></v-text-field>

        <v-text-field
            v-model="Password"
            :counter="30"
            :rules="PasswordRules"
            label="Password"
            required
        ></v-text-field>

        <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'You must agree to continue!']"
            label="Forgot Password?"
            required
        ></v-checkbox>
        
        <div class="d-flex justify-center mb-6 ">
            <v-btn
                color="success"
                class="me-4"
                @click="validate"
            >
                Validate
            </v-btn>
        </div>
        </v-form>
    </v-card>
    </v-sheet>
    </div>
</template>

<script  lang="ts">
export default {
  data: () => ({
    valid: true,
    Password: '',
    PasswordRules: [
    ],
    email: '',
    emailRules: [
    ],

    checkbox: false,
  }),

  methods: {
    async validate () {

    },
  },
}
</script>

<style scoped lang="scss">
$height: 110px;
.container {
    margin-top: 5em;
    margin-left: 7em;
    margin-right: 7em;

    .logo {
        position: absolute;
        height: $height;
    }
}
</style>