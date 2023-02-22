<template>
    <div class="container">
        <Menubar>
            <template #start>
            </template>
            <template #end>
                <Button icon="pi pi-user" @click="visibleRight = true" class="p-button-rounded p-button-info p-button-text" aria-label="User" />
                <Sidebar v-model:visible="visibleRight" :showCloseIcon="false" position="right">
                    <PanelMenu :model="items" />
                </Sidebar>
            </template>
        </Menubar>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
    name: "Navbar.vue",

    setup() {
        const visibleRight = ref(false);
		return { visibleRight }
    },
    data() {
		return {
			items: [
                {
                    label: 'Se déconnecter',
                    icon:'pi pi-sign-out',
                }
            ]
        }
	}
}
</script>

<style scoped lang="scss">
@import "../assets/colors.scss";
$height: 110px;
.container {
    background: $dark-blue;
    height: 50px;

    .link {
        color: white;
        padding: 2em;
    }
    .logo {
        position: absolute;
        height: $height;
    }
}
</style>
