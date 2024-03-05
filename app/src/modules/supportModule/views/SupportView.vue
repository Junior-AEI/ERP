<template>
  <div>
    <Tabs v-if="isAdmin" default-value="manage" class="w-full">
      <TabsList>
        <TabsTrigger value="manage"> Voir les dernières demandes d'assistance </TabsTrigger>
        <TabsTrigger value="ask"> Demander de l'assistance </TabsTrigger>
      </TabsList>
      <TabsContent value="manage">
        <AdminSupport />
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
import AdminSupport from '../components/SupportAdmin.vue'

const isAdmin = true
</script>
