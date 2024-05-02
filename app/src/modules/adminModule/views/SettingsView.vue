<template>
  <div>
    <Tabs default-value="positions" class="overflow-y-none w-full overflow-x-auto" v-auto-animate>
      <TabsList>
        <TabsTrigger value="positions" v-auto-animate class="gap-2">
          <Icon name="group" class="text-6xl" />
          Liste des postes
        </TabsTrigger>
        <TabsTrigger value="divisions" v-auto-animate class="gap-2">
          <Icon name="diversity_3" class="text-6xl" />
          Liste des pôles
        </TabsTrigger>
        <TabsTrigger value="server" v-auto-animate class="gap-2">
          <Icon name="settings" class="text-6xl" />
          Configuration du serveur
        </TabsTrigger>
      </TabsList>
      <TabsContent value="positions" v-auto-animate class="gap-2">
        <SettingsPositions />
      </TabsContent>
      <TabsContent value="divisions" v-auto-animate>
        <SettingsDivisions />
      </TabsContent>
      <TabsContent value="server" v-auto-animate>
        <SettingsServer />
      </TabsContent>
    </Tabs>
  </div>
</template>
