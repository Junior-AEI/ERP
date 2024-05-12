<template>

<Card>
<CardContent>
<div class="flex flex-1 flex-row gap-2 items-center">
    <Icon name="person"></Icon>
    <div class="flex flex-1 flex-col">
        <span class="text-accent">
            {{ props.infos.firstname }} {{ props.infos.lastname }}
        </span>
        <span class="text-sm">
            {{ props.infos.function }} de {{ props.infos.name }}
        </span>
        
    </div>
</div>

</CardContent>

</Card>


</template>

<script lang="ts" setup>

import { type ClientInfo, type Company } from '@/types/api'
import { defineProps } from 'vue'


const props = defineProps<{
    infos: ClientInfo
}>()

</script>
