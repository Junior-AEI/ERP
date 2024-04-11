<template>
    <Card class="flex-1">
        <CardHeader>
            <Icon name="person" class="text-6xl" />
            <span class="text-accent"> Informations sur l'Utilisateur </span>
        </CardHeader>
        <CardContent>
            <div class="flex gap-4">
                <div class="flex flex-1 flex-col gap-2">
                    <Label for="userId">Identifiant Utilisateur</Label>
                    <Input id="userId" v-model="userInfo.userId" />
                </div>
                <div class="flex flex-1 flex-col gap-2">
                    <Label for="username">Nom d'utilisateur</Label>
                    <Input id="username" v-model="userInfo.username" />
                </div>
            </div>
            <div class="flex flex-1 flex-col gap-2">
                <Label for="emailJE">Email J.E.</Label>
                <Input id="emailJE" v-model="userInfo.emailJE" />
            </div>
            <div class="flex gap-4">
                <div class="flex flex-1 flex-col gap-2">
                    <Label for="lastname">Date de début de mandat</Label>
                    <Popover>
                        <PopoverTrigger as-child>
                            <Button :variant="'outline'" :class="cn(
                                'w-full justify-start text-left font-normal',
                                !userInfo.mandateStart && 'text-muted-foreground',
                            )">
                                <Icon name="calendar_month" class="mr-2" />
                                <span>{{ userInfo.mandateStart ? userInfo.mandateStart.toLocaleDateString('fr-FR') :
                                    "Définir la date de début de mandat"
                                    }}</span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent class="w-auto p-0">
                            <Calendar v-model="userInfo.mandateStart" />
                        </PopoverContent>
                    </Popover>
                </div>
                <div class="flex flex-1 flex-col gap-2">
                    <Label for="lastname">Date de fin de mandat</Label>
                    <Popover>
                        <PopoverTrigger as-child>
                            <Button :variant="'outline'" :class="cn(
                                'w-full justify-start text-left font-normal',
                                !userInfo.mandateEnd && 'text-muted-foreground',
                            )">
                                <Icon name="calendar_month" class="mr-2" />
                                <span>{{ userInfo.mandateEnd ? userInfo.mandateEnd.toLocaleDateString('fr-FR') :
                                    "Définir la date de fin de mandat"
                                    }}</span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent class="w-auto p-0">
                            <Calendar v-model="userInfo.mandateEnd" />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <Button @click="editUserData()">Modifier</Button>
        </CardContent>
    </Card>
</template>

<script setup lang="ts">

import axios from 'axios';
import type { User } from '@/types/api';
import { ref } from 'vue';
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/authStore';

const editUserData = () => {
    console.log({
        userId: userInfo.value.userId,
        username: userInfo.value.username,
        mandateStart: userInfo.value.mandateStart.toISOString(),
        mandateEnd: userInfo.value.mandateEnd.toISOString(),
        emailJE: userInfo.value.emailJE
    })
    alert('Not Implemented Yet (route not ready)')
}

const props = defineProps<{
    userId: number;
}>();

const userInfo = ref<User>({
    userId: props.userId,
    username: '',
    mandateStart: new Date(),
    mandateEnd: new Date(),
    emailJE: ''
});


axios.get(`/user/${props.userId}`, {
    headers: {
        'Authorization': `Bearer ${useAuthStore().token}`
    }
}).then((response) => {
    const user = response.data.data.user;
    userInfo.value.userId = user.userId
    userInfo.value.username = user.username
    userInfo.value.mandateStart = new Date(user.mandateStart)
    userInfo.value.mandateEnd = new Date(user.mandateEnd)
    userInfo.value.emailJE = user.emailJE
}).catch((error) => {
    console.error(error);
});


</script>
