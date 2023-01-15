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

<style scoped>

</style>
