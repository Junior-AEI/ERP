<template>
    <div class="flex justify-content-center h-full">
        <div
            class="surface-card p-4 shadow-2 border-round lg:w-3"
            id="main_box"
        >
            <div class="text-center mb-5">
                <img
                    src="/src/assets/logos/logo-bi-fc.svg"
                    alt="Logo"
                    height="100"
                    class="mb-3"
                />
            </div>

            <div>
                <label
                    for="login"
                    class="block text-900 font-medium mb-2"
                ></label>
                <InputText
                    id="login"
                    type="text"
                    placeholder="Adresse e-mail"
                    class="w-full mb-3"
                    v-model="login"
                />

                <label
                    for="password"
                    class="block text-900 font-medium mb-2"
                ></label>
                <InputText
                    id="password"
                    type="password"
                    placeholder="Mot de passe"
                    class="w-full mb-3"
                    v-model="password"
                />

                <!-- To do later : remember me and forget password -->
                <!-- <div
                    class="flex align-items-center justify-content-between mb-6"
                >
                    <div class="flex align-items-center">
                        <Checkbox
                            id="rememberme1"
                            :binary="true"
                            v-model="checked1"
                            class="mr-2"
                        ></Checkbox>
                        <label for="rememberme1">Se souvenir de moi</label>
                    </div>
                    <a
                        class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
                        >Mot de passe oublié ?</a
                    >
                </div> -->
                <Message v-if="wrongValue" severity="error" :closable="false"
                    >Les informations transmises n'ont pas permis de vous
                    authentifier.</Message
                >
                <Button
                    @click="connection(login, password)"
                    label="Se connecter"
                    class="w-full"
                ></Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from "@/router";
import axios from "axios";
import { ref } from "vue";

const checked1 = false;
let login: string;
let password: string;
let wrongValue = ref(false);

async function connection(login: string, password: string) {
    await axios
        .post("/login", {
            nomUtilisateur: login,
            motDePasse: password,
        })
        .then((res) => {
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("adherent_id", res.data.adherent_id);
            sessionStorage.setItem("utilisateur_id", res.data.utilisateur_id);
            login = "";
            password = "";
            router.push(`/home`);
        })
        .catch(() => {
            wrongValue.value = true;
            setTimeout(() => (wrongValue.value = false), 3000);
        });
}

document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        connection(
            document.getElementById("login").value,
            document.getElementById("password").value
        );
    }
});
</script>
<style lang="scss">
@import "/node_modules/primeflex/primeflex.css";
#main_box {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
}
</style>
