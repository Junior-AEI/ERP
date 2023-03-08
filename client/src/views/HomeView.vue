<template>
    <div class="flex justify-content-center h-full">
        <div
            class="surface-card p-4 shadow-2 border-round align-self-center lg:w-6"
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

                <div
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
                </div>

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
/*function storageAvailable(type : any) {
    let storage;
    try {
        storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}*/

import axios from "axios";

const checked1 = false;
let login: string;
let password: string;

axios.defaults.baseURL = "http://localhost:5000/api";
async function connection(login: string, password: string) {
    const res = await axios
        .post("/login", {
            nomUtilisateur: login,
            motDePasse: password,
        })
        .then((res) => {
            sessionStorage.setItem("token", res.data.token);
        });
}
</script>
<style lang="scss">
@import "/node_modules/primeflex/primeflex.css";
</style>
