<script setup lang="ts">
defineProps<{
  personId: number
}>()
</script>
<template>
  <Wrapper class="w-full max-w-xl flex-col">
    <MemberInfo :memberId="personId" />
    <UserInfo :userId="personId" />
  </Wrapper>
</template>
