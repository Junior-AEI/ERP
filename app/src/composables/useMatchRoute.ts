import { useRoute } from 'vue-router'

const useMatchRoute = (path: string) => {
  const route = useRoute()
  if (path === '/') {
    return route.path === '/'
  }
  return route.path === path
}

export default useMatchRoute
