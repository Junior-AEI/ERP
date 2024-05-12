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
                {{ props.infos.department }}  |  Promo {{ props.infos.promotion }}
            </span>
            
        </div>
    </div>
    
    </CardContent>
    
    </Card>
    
    
</template>
    
<script lang="ts" setup>
    
import { type FullMember } from '@/types/api'
import { defineProps } from 'vue'


const props = defineProps<{
    infos: FullMember
}>()

</script>
    