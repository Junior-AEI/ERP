import TasksCard from '@/components/tasks/TasksCard.vue';
<template>
  <div class="flex flex-1">
    <div class="flex flex-1 flex-row flex-wrap gap-6">
      <div class="flex max-w-2xl flex-1 flex-col gap-4">
        <TasksCard> </TasksCard>
      </div>
      <div class="flex flex-1 flex-col gap-4">
        
        <ProjectProgressCard> </ProjectProgressCard>
      </div>
    </div>
  </div>
</template>
