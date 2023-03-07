<template>
    <div class="nav">
        <div class="img-container">
            <img
                class="logo"
                src="../assets/logos/logo-bi-ff.svg"
                alt="AEI logo"
            />
        </div>
        <div class="nav-menu">
            <PanelMenu :model="items" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: [
                {
                    label: "Etudes",
                    icon: "pi pi-fw pi-file",
                    items: [
                        {
                            label: "New",
                            icon: "pi pi-fw pi-plus",
                            items: [
                                {
                                    label: "Bookmark",
                                    icon: "pi pi-fw pi-bookmark",
                                },
                                {
                                    label: "Video",
                                    icon: "pi pi-fw pi-video",
                                },
                            ],
                        },
                        {
                            label: "Delete",
                            icon: "pi pi-fw pi-trash",
                        },
                        {
                            label: "Export",
                            icon: "pi pi-fw pi-external-link",
                        },
                    ],
                },
                {
                    label: "Membres",
                    icon: "pi pi-fw pi-user",
                    items: [
                        {
                            label: "New",
                            icon: "pi pi-fw pi-user-plus",
                        },
                        {
                            label: "Delete",
                            icon: "pi pi-fw pi-user-minus",
                        },
                        {
                            label: "Search",
                            icon: "pi pi-fw pi-users",
                            items: [
                                {
                                    label: "Filter",
                                    icon: "pi pi-fw pi-filter",
                                    items: [
                                        {
                                            label: "Print",
                                            icon: "pi pi-fw pi-print",
                                        },
                                    ],
                                },
                                {
                                    icon: "pi pi-fw pi-bars",
                                    label: "List",
                                },
                            ],
                        },
                    ],
                },
                {
                    label: "Events",
                    icon: "pi pi-fw pi-calendar",
                    items: [
                        {
                            label: "Edit",
                            icon: "pi pi-fw pi-pencil",
                            items: [
                                {
                                    label: "Save",
                                    icon: "pi pi-fw pi-calendar-plus",
                                },
                                {
                                    label: "Delete",
                                    icon: "pi pi-fw pi-calendar-minus",
                                },
                            ],
                        },
                        {
                            label: "Archieve",
                            icon: "pi pi-fw pi-calendar-times",
                            items: [
                                {
                                    label: "Remove",
                                    icon: "pi pi-fw pi-calendar-minus",
                                },
                            ],
                        },
                    ],
                },
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

    .img-container {
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
