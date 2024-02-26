import { ref } from 'vue'
import { useRoute } from 'vue-router'

const useMatchRoute = (path: string) => {
    const route = useRoute()
    const isActive = ref(route.path === '/' + path)

    return {
        isActive
    }
}

export default useMatchRoute
