<template>
  <Card>
    <CardContent>
      <div class="flex flex-1 cursor-pointer flex-row items-center gap-2" @click="handleClick">
        <Icon name="person"></Icon>
        <div class="flex flex-1 flex-col">
          <span class="text-accent"> {{ props.infos.firstname }} {{ props.infos.lastname }} </span>
          <span class="text-sm">
            {{ props.infos.department }} | Promo {{ props.infos.promotion }}
          </span>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { type FullMember } from '@/types/api'
import { defineProps } from 'vue'
const router = useRouter()

const props = defineProps<{
  infos: FullMember
}>()

const handleClick = () => {
  router.push({
    path: '/profile',
    query: {
      id: props.infos.memberId,
      fistname: props.infos.firstname,
      lastname: props.infos.lastname
    }
  })
}
</script>
