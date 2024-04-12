<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  personId: number
}>()
</script>
<template>
  <Wrapper class="w-full max-w-xl flex-col">
    <PersonInfo :personId="personId" />
    <UserInfo :userId="personId" />
    <MemberInfo :memberId="personId" />
  </Wrapper>
</template>
