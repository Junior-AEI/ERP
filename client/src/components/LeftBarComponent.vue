<template>
    <div class="nav">
        <div class="img-container">
            <RouterLink to="/home">
                <img
                    class="logo"
                    src="../assets/logos/logo-bi-ff.svg"
                    alt="AEI logo"
                />
            </RouterLink>
        </div>
        <div class="nav-menu">
            <PanelMenu :model="items" />
        </div>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            items: [
                {
                    label: "Membres",
                    icon: "pi pi-fw pi-users",
                    items: [
                        {
                            icon: "pi pi-fw pi-bars",
                            label: "Liste",
                            to: "/members",
                        },
                    ],
                },
                {
                    label: "Prospects",
                    icon: "pi pi-fw pi-briefcase",
                    items: [
                        {
                            icon: "pi pi-fw pi-bars",
                            label: "Liste",
                            to: "/clients",
                        },
                    ],
                },
                {
                    label: "Postes",
                    icon: "pi pi-fw pi-id-card",
                    items: [
                        {
                            icon: "pi pi-fw pi-bars",
                            label: "Liste",
                            to: "/posts",
                        },
                    ],
                },
                {
                    label: "Documents",
                    icon: "pi pi-fw pi-folder",
                    items: [
                        {
                            icon: "pi pi-fw pi-bars",
                            label: "Upload",
                            to: "/documents",
                        },

                        // {
                        //     label: "New",
                        //     icon: "pi pi-fw pi-user-plus",
                        // },
                    ],
                },
                // {
                //     label: "Etudes",
                //     icon: "pi pi-fw pi-file",
                //     items: [
                //         {
                //             label: "New",
                //             icon: "pi pi-fw pi-plus",
                //             items: [
                //                 {
                //                     label: "Bookmark",
                //                     icon: "pi pi-fw pi-bookmark",
                //                 },
                //                 {
                //                     label: "Video",
                //                     icon: "pi pi-fw pi-video",
                //                 },
                //             ],
                //         },
                //         {
                //             label: "Delete",
                //             icon: "pi pi-fw pi-trash",
                //         },
                //         {
                //             label: "Export",
                //             icon: "pi pi-fw pi-external-link",
                //         },
                //     ],
                // },
                // {
                //     label: "Events",
                //     icon: "pi pi-fw pi-calendar",
                //     items: [
                //         {
                //             label: "Edit",
                //             icon: "pi pi-fw pi-pencil",
                //             items: [
                //                 {
                //                     label: "Save",
                //                     icon: "pi pi-fw pi-calendar-plus",
                //                 },
                //                 {
                //                     label: "Delete",
                //                     icon: "pi pi-fw pi-calendar-minus",
                //                 },
                //             ],
                //         },
                //         {
                //             label: "Archieve",
                //             icon: "pi pi-fw pi-calendar-times",
                //             items: [
                //                 {
                //                     label: "Remove",
                //                     icon: "pi pi-fw pi-calendar-minus",
                //                 },
                //             ],
                //         },
                //     ],
                // },
            ],
        };
    },
};
</script>

<style scoped lang="scss">
@import "../assets/colors.scss";

.nav {
    background-color: $dark-blue;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;

    .img-container a {
        display: flex;
        justify-content: center;

        .logo {
            width: 90%;
        }
    }

    .nav-menu {
        width: 100%;
        margin-top: 30px;
    }
}
</style>
