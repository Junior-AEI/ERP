import { useRoute } from 'vue-router'

const useMatchRoute = (path: string) => {
  const route = useRoute()
  const location = '/' + route.path.split('/')[1]
  return location === path
}

export default useMatchRoute
