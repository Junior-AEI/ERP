<template>
  <Card>
    <CardContent>
      <div class="flex flex-1 flex-row items-center gap-2">
        <!-- <Icon name="app_registration"></Icon> -->
        <div class="flex flex-1 flex-col gap-2">
          <div class="gap- flex flex-1 flex-row items-center gap-3">
            <span class="text-2xl font-bold text-accent">
              {{ props.infos.acronym }}
            </span>
            <span class="text-m">
              {{ props.infos.name }}
            </span>
          </div>
          <div class="ml-4 flex flex-1 flex-wrap justify-start gap-4">
            <Card class="flex w-fit flex-row">
              <div
                class="flex h-full w-fit items-center justify-center rounded-s-xl bg-black/30 pl-2 pr-2"
              >
                Client
              </div>
              <CardContent class="m-2 ml-4 mr-4 flex flex-1 flex-row items-center gap-4 p-0">
                <div class="flex flex-row items-center justify-between gap-2">
                  <span>Le {{ props.infos.endDate }} </span>
                  <span class="text-muted-foreground/50"> (dans {{ props.infos.delta }}) </span>
                </div>
              </CardContent>
            </Card>

            <Card class="flex w-fit flex-row">
              <div
                class="flex h-full w-fit items-center justify-center rounded-s-xl bg-black/30 pl-2 pr-2"
              >
                Client
              </div>
              <CardContent class="m-2 ml-4 mr-4 flex flex-1 flex-row items-center gap-4 p-0">
                <div class="flex flex-row items-center justify-start">
                  <span> {{ props.infos.firstname }} {{ props.infos.lastname }} </span>
                </div>
              </CardContent>
            </Card>

            <Card class="flex w-fit flex-row">
              <div
                class="flex h-full w-fit items-center justify-center rounded-s-xl bg-black/30 pl-2 pr-2"
              >
                Chargé d'Étude
              </div>
              <CardContent class="m-2 ml-4 mr-4 flex flex-1 flex-row items-center gap-4 p-0">
                <div class="flex flex-row items-center justify-start">
                  <span v-for="manager in props.infos.projectManagers" :key="manager.personId">
                    {{ manager.firstname }} {{ manager.lastname }}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card class="flex w-fit flex-row">
              <div
                class="flex h-full w-fit items-center justify-center rounded-s-xl bg-black/30 pl-2 pr-2"
              >
                Intervenants
              </div>
              <CardContent class="m-2 ml-4 mr-4 flex flex-1 flex-row items-center gap-4 p-0">
                <div class="flex flex-row items-center justify-start">
                  <span v-for="contributor in props.infos.contributors" :key="contributor.personId">
                    {{ contributor.firstname }} {{ contributor.lastname }}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import { type ExtendedProject } from '@/types/api'
import { defineProps } from 'vue'

const props = defineProps<{
  infos: ExtendedProject
}>()
</script>
