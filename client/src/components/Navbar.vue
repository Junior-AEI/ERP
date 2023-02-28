<template>
    <div class="container">
        <div class="container">
            <Button icon="pi pi-user" @click="visibleRight = true" class="p-button-rounded p-button-info p-button-text" aria-label="User" />
            <Sidebar v-model:visible="visibleRight" :showCloseIcon="false" position="right">
                <PanelMenu :model="items" />
            </Sidebar>
        </div>
    </div>
</template>

<script lang="ts">
import type Button from 'primevue/button';
import { ref } from 'vue';

export default {
    name: "Navbar.vue",

    // methods :{
    //     delete(){
    //         console.log("suppression compte");
    //     },
    //     end_session(){
    //         console.log("déconnexion");
    //     }
    // },

    setup() {
        const visibleRight = ref(false);
		return { visibleRight };
        
    },
    data() {
		return {
			items: [
                {
                    label: 'Se déconnecter',
                    icon:'pi pi-sign-out',
                },
                {
                    label: 'Supprimer mon compte',
                    icon: 'pi pi-fw pi-trash',
                    ///@click: delete(),
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
    position: fixed;
    background: $dark-blue;
    height: 50px;
    width: 1536px;
}
#userButton{
    justify-content: left;
    background: $dark-blue;
}
</style>
