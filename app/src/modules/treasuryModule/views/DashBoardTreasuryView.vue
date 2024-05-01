import TasksCard from '@/components/tasks/TasksCard.vue';
<template>
  <div class="flex flex-1">
    <div class="flex flex-1 flex-row gap-6">
      <div class="flex flex-1 flex-col gap-4 max-w-2xl">
        <TasksCard> </TasksCard>
        <Card>
          <CardContent> </CardContent>
        </Card>
      </div>
      <div class="flex flex-1 flex-col gap-4">
        <Card>
          <CardContent> </CardContent>
        </Card>
        <ProjectProgressCard> </ProjectProgressCard>
      </div>
    </div>
  </div>
</template>
