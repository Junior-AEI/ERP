<template>
  <section class="nav">
    <div>
        <img
            class="logo"
            src="../assets/logos/logo-bi-ff.svg"
            alt="AEI logo"
        />
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

<style lang="scss">
$height: 90px;
@import '../assets/_theme.scss';
.nav{
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 50px;
  left: 0;
  bottom: 0;
  width: 17vw;
  .logo {
    height: $height;
    width: 100%;

  }
 .nav-menu
    {width: 17vw;
    margin-top: 30px;
     
    }
}
   .p-panelmenu, .p-component *{
        background-color: var(--primary-color);    
        color: var(--primary-color-text	);
    }

.p-panelmenu {
    --primary-color: #0c2764!important;
    --primary-color-text: #fdfcfc !important;
}
.p-panelmenu .p-panelmenu-content{
    padding: 0px !important;
}
.p-panelmenu .p-panelmenu-content .p-menuitem > .p-menuitem-content .p-menuitem-link .p-menuitem-text {
  color: #fff !important;
}
</style>
