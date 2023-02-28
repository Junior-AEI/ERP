<template>
  <section class="nav">
    <div class="nav-logo">
 
    </div>
    <div class="nav-menu">
        <PanelMenu :model="items"/>
    </div>
  </section>
</template>

<script>
export default {
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
.nav{
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: $dark-blue;
  top: 0;
  left: 0;
  bottom: 0;
  width: 17vw;
  .nav-logo
    { position: absolute;
      height: $height;
    }
  .nav-menu
    {width: 17vw;}
}
</style>
