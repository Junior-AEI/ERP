<template>

    <Card>
        <CardContent>
            <div class="flex flex-1 flex-row gap-2 items-center">
                <!-- <Icon name="app_registration"></Icon> -->
                <div class="flex flex-1 flex-col gap-2">

                    <div class="flex flex-1 flex-row gap- items-center gap-3">
                        <span class="text-2xl font-bold text-accent">
                            {{ props.infos.acronym }}
                        </span>
                        <span class="text-m">
                            {{ props.infos.name }}
                        </span>
                    </div>
                    <div class="flex flex-1 justify-start flex-wrap gap-4 ml-4">
                        <Card class="flex flex-row w-fit">
                            <div
                            class=" w-fit h-full bg-black/30 rounded-s-xl flex justify-center items-center pr-2 pl-2">
                            Client</div>
                            <CardContent class="flex flex-1 flex-row gap-4 m-2 mr-4 ml-4 items-center p-0">
                                    <div class="flex flex-row justify-between items-center gap-2">
                                        <span>Le {{ props.infos.endDate }} </span>
                                        <span class="text-muted-foreground/50"> (dans {{ props.infos.delta }}) </span>
                                    </div>
                                
                            </CardContent>
                        </Card>

                        <Card class="flex flex-row w-fit">
                            <div
                            class=" w-fit h-full bg-black/30 rounded-s-xl flex justify-center items-center pr-2 pl-2">
                            Client</div>
                            <CardContent class="flex flex-1 flex-row gap-4 m-2 mr-4 ml-4 items-center p-0">
                                    <div class="flex flex-row justify-start items-center">
                                        <span> {{ props.infos.firstname }} {{ props.infos.lastname }} </span>
                                        
                                    </div>
                                
                            </CardContent>
                        </Card>

                        <Card class="flex flex-row w-fit">
                            <div
                            class=" w-fit h-full bg-black/30 rounded-s-xl flex justify-center items-center pr-2 pl-2">
                            Chargé d'Étude</div>
                            <CardContent class="flex flex-1 flex-row gap-4 m-2 mr-4 ml-4 items-center p-0">
                                <div class="flex flex-row justify-start items-center">
                                    <span v-for="manager in props.infos.projectManagers">
                                        {{ manager.firstname }} {{ manager.lastname }} </span>

                                </div>
                            </CardContent>
                        </Card>

                        <Card class="flex flex-row w-fit">
                            <div
                            class=" w-fit h-full bg-black/30 rounded-s-xl flex justify-center items-center pr-2 pl-2">
                            Intervenants</div>
                            <CardContent class="flex flex-1 flex-row gap-4 m-2 mr-4 ml-4 items-center p-0">
                                    
                                <div class="flex flex-row justify-start items-center">
                                    <span v-for="contributor in props.infos.contributors">
                                        {{ contributor.firstname }} {{ contributor.lastname }} </span>

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