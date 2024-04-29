import { defineStore } from 'pinia'
import { useLocalStorage } from "@vueuse/core"

export const useGeneralStore = defineStore('appData', {
    state: () => {
        return {
            sidebarStatusShrink: useLocalStorage('sidebarStatusShrink', false),
        }
    },
    actions: {
        expandSidebar() {
            this.sidebarStatusShrink = false;
        },
        shrinkSidebar() {
            this.sidebarStatusShrink = true;
        }
    }

})
