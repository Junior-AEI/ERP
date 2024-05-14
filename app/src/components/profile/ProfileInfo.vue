<script setup lang="ts">
defineProps<{
  personId: number
}>()
</script>
<template>
  <Wrapper class="flex-row">
    <MemberInfo :memberId="personId" />
    <div class="flex flex-1 flex-col gap-2">
      <AdressInfo :memberId="personId" />
      <UserInfo :userId="personId" />
    </div>
  </Wrapper>
</template>
