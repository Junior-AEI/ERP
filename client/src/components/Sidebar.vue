<template>
    <div>
        <Button icon="pi pi-home" @click="visibleLeft = true" class="p-button-rounded p-button-info p-button-outlined" style="margin-left:20px;margin-top:20px;"/>

        <Sidebar v-model:visible="visibleLeft">
                <div class="container">
                    <img
                        class="logo"
                        src="../assets/logos/logo-bi-ff.svg"
                        alt="AEI logo"
                    />
                </div>
            <PanelMenu :model="items" />
        </Sidebar>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    setup() {
        const visibleLeft = ref(false);
		return { visibleLeft }
    },
    data() {
		return {
			items: [
                {
                    label: 'Etudes',
                    icon:'pi pi-fw pi-file',
                    items: [
                        {
                            label: 'New',
                            icon:'pi pi-fw pi-plus',
                            items: [
                                {
                                    label: 'Bookmark',
                                    icon:'pi pi-fw pi-bookmark'
                                },
                                {
                                    label: 'Video',
                                    icon:'pi pi-fw pi-video'
                                }
                            ]
                        },
                        {
                            label: 'Delete',
                            icon:'pi pi-fw pi-trash'
                        },
                        {
                            label: 'Export',
                            icon:'pi pi-fw pi-external-link'
                        }
                    ]
                },
                {
                    label: 'Membres',
                    icon:'pi pi-fw pi-user',
                    items: [
                        {
                            label: 'New',
                            icon:'pi pi-fw pi-user-plus',

                        },
                        {
                            label: 'Delete',
                            icon:'pi pi-fw pi-user-minus',
                        },
                        {
                            label: 'Search',
                            icon:'pi pi-fw pi-users',
                            items: [
                                {
                                    label: 'Filter',
                                    icon:'pi pi-fw pi-filter',
                                    items: [
                                        {
                                            label: 'Print',
                                            icon:'pi pi-fw pi-print'
                                        }
                                    ]
                                },
                                {
                                    icon:'pi pi-fw pi-bars',
                                    label: 'List'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: 'Events',
                    icon:'pi pi-fw pi-calendar',
                    items: [
                        {
                            label: 'Edit',
                            icon:'pi pi-fw pi-pencil',
                            items: [
                                {
                                    label: 'Save',
                                    icon:'pi pi-fw pi-calendar-plus'
                                },
                                {
                                    label: 'Delete',
                                    icon:'pi pi-fw pi-calendar-minus'
                                }
                            ]
                        },
                        {
                            label: 'Archieve',
                            icon:'pi pi-fw pi-calendar-times',
                            items: [
                                {
                                    label: 'Remove',
                                    icon:'pi pi-fw pi-calendar-minus'
                                }
                            ]
                        }
                    ]
                }
            ]
		}
	}
}
</script>

<style scoped lang="scss">
@import "../assets/colors.scss";
$height: 90px;
.container {
    background: $dark-blue;
    height: $height;
    .logo {
        position: absolute;
        height: $height;
    }
}
</style>
