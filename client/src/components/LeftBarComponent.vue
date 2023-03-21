<template>
    <div class="nav">
        <div class="img-container">
            <RouterLink to="/">
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
                    icon: "pi pi-fw pi-user",
                    items: [
                        {
                            icon: "pi pi-fw pi-bars",
                            label: "List",
                            to: "/users",
                        },
                    ],
                },
                {
                    label: "Prospects",
                    icon: "pi pi-fw pi-user",
                    items: [
                        {
                            icon: "pi pi-fw pi-bars",
                            label: "List",
                            to: "/clients",
                        },
                    ],
                },
                {
                    label: "Posts",
                    icon: "pi pi-fw pi-user",
                    items: [
                        {
                            icon: "pi pi-fw pi-bars",
                            label: "List",
                            to: "/Posts",
                        },
                    ],
                },
                {
                    label: "Documents",
                    icon: "pi pi-fw pi-doc",
                    items: [
                        {
                            icon: "pi pi-fw pi-bars",
                            label: "Upload",
                            to: "/doc",
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
