<template>
  <div class="flex h-12 w-full items-center justify-between border-b bg-primary-foreground px-4">
    <div class="flex items-center gap-3 text-sm">
      <Icon :name="icon" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem v-for="parent in getParentsRoutes" :key="parent.path">
            <RouterLink :to="parent.path">
              {{ parent.name }}
            </RouterLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbPage>{{ routeName }}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
    <img
      @click="$router.push({ path: '/' })"
      src="/logo.svg"
      alt="logo"
      class="h-full cursor-pointer"
    />
  </div>
</template>

<script setup lang="ts">
import type { IconNames } from '@/types'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()

const routeName = computed(() => {
  return route.name
})

const router = useRouter()

type Route = {
  name: string
  path: string
}

const getRccursiveParentsRoutes = (path: string): Route[] => {
  // decompose the path
  if (path === '') {
    return []
  }
  const pathArray = path.split('/')
  // search the name of the last route
  const lastRoute = router.getRoutes().find((r: any) => r.path === path)
  if (!lastRoute) {
    return []
  }
  return [
    ...getRccursiveParentsRoutes(pathArray.slice(0, pathArray.length - 1).join('/')),
    {
      name: lastRoute.name as string,
      path: lastRoute.path
    }
  ]
}

const getParentsRoutes = computed(() => {
  return getRccursiveParentsRoutes(route.path).filter((r) => r.path !== route.path)
})

const icon = computed<IconNames>(() => (route.meta['icon'] as IconNames) ?? 'draft')
</script>
