<template>
  <Card>
    <CardContent>
      <div class="flex flex-1 cursor-pointer flex-row items-center gap-2" @click="handleClick">
        <Icon name="person"></Icon>
        <div class="flex flex-1 flex-col">
          <span class="text-accent"> {{ props.infos.firstname }} {{ props.infos.lastname }} </span>
          <span class="text-sm"> {{ props.infos.function }} de {{ props.infos.name }} </span>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { type ClientInfo } from '@/types/api'
import { defineProps } from 'vue'
const router = useRouter()

const props = defineProps<{
  infos: ClientInfo
}>()
const handleClick = () => {
  router.push({
    path: '/client/profil',
    query: {
      id: props.infos.personId,
      name: `${props.infos.firstname} ${props.infos.lastname} de ${props.infos.name}`
    }
  })
}
</script>
