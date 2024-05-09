<template>
  <Card>
    <div class="flex flex-1 flex-row-reverse gap-4 m-2 mr-4 ml-4 items-center">
      <div class="absolute top-0 left-0 w-1/6 h-full bg-black/30 rounded-s-xl flex justify-center items-center">{{ props.acronym }}</div>
      <div class="w-5/6 flex flex-col items-start justify-center">
        <h3>{{ props.advancement }}</h3>
        <span>{{ props.comment }}</span>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">

import axios from 'axios';
import { defineProps, ref } from 'vue'


const props = defineProps<{
  acronym: string
  advancement: string
  comment: string
}>()




</script>
