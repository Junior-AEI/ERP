<!-- Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
Maintainer: contact@junior-aei.com

This file is part of LATIME.

LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>. -->
<template>
    <div>
        <div v-for="user in users" :key="user.id">
            {{ user.name }}
            <button @click="removeUser(user)">Supprimer</button>
        </div>
        <input type="text" v-model="currentInput" />
        <button @click="addUser">Ajouter</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "TestComponent",
    data() {
        return {
            users: [],
            currentInput: "",
        };
    },
    created() {
        fetch("/api/user")
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    this.users = data.users;
                }
            });
    },
    methods: {
        addUser() {
            fetch("/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: this.currentInput }),
            })
                .then((response) => response.json())
                .then((res) => {
                    if (res.status === "success") {
                        this.users.push(res.data);
                    }
                });
        },
        removeUser(user) {
            fetch("/api/user", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: user.name }),
            })
                .then((response) => response.json())
                .then((res) => {
                    if (res.status === "success") {
                        this.users = this.users.filter(
                            (u) => u.name !== user.name
                        );
                    }
                });
        },
    },
});
</script>

<style scoped></style>
