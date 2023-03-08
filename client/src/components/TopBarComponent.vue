<template>
    <div class="container">
        <Breadcrumb :home="home" :model="itemsBreadcrumb"> </Breadcrumb>
        

        <Button
            icon="pi pi-user"
            @click="visibleRight = true"
            class="p-button-rounded p-button-info p-button-text"
            aria-label="User"
        />
        <Toast />
        <ConfirmDialog></ConfirmDialog>
        <ConfirmDialog group="templating">
                <template #message="slotProps">
                    <div class="flex p-4">
                        <i :class="slotProps.message.icon" style="font-size: 1.5rem"></i>
                        <p class="pl-2">{{slotProps.message.message}}</p>
                    </div>
                </template>
        </ConfirmDialog>
        <ConfirmDialog group="positionDialog"></ConfirmDialog>
 
        
        <Sidebar
            v-model:visible="visibleRight"
            :showCloseIcon="false"
            position="right"
        >
            <PanelMenu :model="items" />
        </Sidebar>
    </div>
</template>

<script setup lang="ts">
import type Button from "primevue/button";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import type Breadcrumb from "primevue/breadcrumb";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";


const confirm = useConfirm();
const toast = useToast();
const confirm1 = () => {
    confirm.require({
                message: 'Etes-vous sûr(e) de vouloir supprimer votre compte',
                header: 'Suppression du compte',
                icon: 'pi pi-info-circle',
                acceptClass: 'p-button-danger',
                accept: () => {
                    toast.add({severity:'info', summary:'Confirmé', detail:'Compte supprimé', life: 3000});
                },
                reject: () => {
                    toast.add({severity:'error', summary:'Annulé', detail:'Compte pas supprimé', life: 3000});
                }
            });
        }



const visibleRight = ref(false);
const items = [
    {
        label: "Se déconnecter",
        icon: "pi pi-sign-out",
    },
    {
        label: "Supprimer mon compte",
        icon: "pi pi-fw pi-trash",
        command: () => { confirm.require({
                message: 'Etes-vous sûr(e) de vouloir supprimer votre compte',
                header: 'Suppression du compte',
                icon: 'pi pi-info-circle',
                acceptClass: 'p-button-danger',
                acceptLabel: 'Oui',
                rejectLabel: 'Non',
                accept: () => {
                    toast.add({severity:'info', summary:'Confirmé', detail:'Compte supprimé', life: 3000});
                },
                reject: () => {
                    toast.add({severity:'info', summary:'Annulé', detail:'Le compte n\'a pas été supprimé', life: 3000});
                }
            });
        }
    },
];




const home = { icon: "pi pi-home", to: "/" };
const router = useRouter();
let itemsBreadcrumb = ref([{ label: "Home", to: "/" }]);
watch(router.currentRoute, (route) => {
    let totalRoute = "/";
    itemsBreadcrumb.value = route.fullPath
        .split("/")
        .filter((item) => item !== "")
        .map((item) => {
            totalRoute += item + "/";
            return {
                label: item.charAt(0).toUpperCase() + item.slice(1),
                to: totalRoute,
            };
        });
});





function shallowMount(MyComponent: any, arg1: { props: { aProp: any; }; global: { components: { useConfirm: () => { require: (option: import("primevue/confirmationoptions").ConfirmationOptions) => void; close: () => void; }; }; plugins: any[]; }; }) {
throw new Error("Function not implemented.");
}
</script>

<style scoped lang="scss">
@import "../assets/colors.scss";
$height: 110px;
.container {
    display: flex;
    justify-content: space-between;
    background: $dark-blue;
    height: 50px;

    .p-button-text {
        color: #ffffff !important;
    }
}

Button {
    margin: 0.5em 1em 0.5em 0.5em;
}
</style>
