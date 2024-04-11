<template>
    <Card class="flex-1">
        <CardHeader>
            <Icon name="person" class="text-6xl" />
            <span class="text-accent"> Informations sur l'Utilisateur </span>
        </CardHeader>
        <CardContent>
            <div class="flex gap-4">
                <div class="flex flex-1 flex-col gap-2">
                    <Label for="lastname">Identifiant Utilisateur</Label>
                    <Input id="lastname" v-model="userInfo.userId" />
                </div>
            </div>
        </CardContent>
    </Card>
</template>

<script setup lang="ts">

const props = defineProps<{
    userId: number;
}>();

const userInfo = {
    userId: props.userId,
}

</script>
