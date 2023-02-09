<template>
    <v-container class="Vcontainer">
        <v-row no-gutters>
            <v-col cols="4">
                <div class="container">
                    <img
                        class="logo"
                        src="../assets/logos/logo-bi-ff.svg"
                        alt="AEI logo"
                    />
                </div>
            </v-col>
            <v-col>
                <div class="container">
                    <br /><br /><br />
                    <router-link to="/" class="link"
                        >Page d'accueil</router-link
                    >
                    <router-link to="/" class="link">Membres</router-link>
                    <router-link to="/" class="link">Etudes</router-link>
                    <router-link to="/" class="link">Qualité</router-link>
                    <router-link to="/" class="link">Tréso</router-link>
                    <router-link to="/" class="link">Profil</router-link>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
export default {
    name: "Navbar.vue",
};
</script>

<style scoped lang="scss">
@import "../assets/colors.scss";
$height: 110px;
.container {
    background: $dark-blue;
    height: $height;
    .link {
        color: white;
        padding: 2em;
    }
    .logo {
        position: absolute;
        height: $height;
    }
}
.Vcontainer {
    margin: 0em;
    padding: 0em;
    max-width: 2000px;
}
</style>
