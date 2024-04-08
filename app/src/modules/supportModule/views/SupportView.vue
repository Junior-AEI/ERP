<template>
  <div>
    <Tabs v-if="isAdmin" default-value="manage" class="w-full" v-auto-animate>
      <TabsList>
        <TabsTrigger value="manage" v-auto-animate>
          Voir les dernières demandes d'assistance
        </TabsTrigger>
        <TabsTrigger value="ask" v-auto-animate> Demander une assistance </TabsTrigger>
      </TabsList>
      <TabsContent value="manage" v-auto-animate>
        <AdminSupport />
      </TabsContent>
      <TabsContent value="ask" v-auto-animate>
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
