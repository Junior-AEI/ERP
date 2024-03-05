<template>
  <div>
    <Tabs v-if="isAdmin" default-value="manage" class="w-full">
      <TabsList>
        <TabsTrigger value="manage"> Voir les dernières demandes d'assistance </TabsTrigger>
        <TabsTrigger value="ask"> Demander de l'assistance </TabsTrigger>
      </TabsList>
      <TabsContent value="manage">
        <div>admin</div>
      </TabsContent>
      <TabsContent value="ask">
        <AskSupportForm />
      </TabsContent>
    </Tabs>
    <AskSupportForm v-else />
  </div>
</template>

<script setup lang="ts">
import AskSupportForm from '../components/AskSupportForm.vue'

const isAdmin = true
</script>
