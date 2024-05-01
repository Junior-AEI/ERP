
<script setup lang="ts">
import {ref} from "vue"
import axios from "axios"

const placeholder = "Attribuer à"
const groupusers = [
  { value: 'aei', label: 'AEI' },
  { value: 'bureau', label: 'Bureau' },
  { value: 'nuxt.js', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
]

axios.get("/group").then((response)=>{console.log(response);
 })

const selectedUsers = ref<string[]>([])

</script>


<template>

    <div class="flex flex-1 flex-col gap-1">
        <h3>Ajouter une tâche :</h3>
        <div class="flex flex-col gap-1">
            <Input type="text" placeholder="ma tâche" />
            <Input type="date" placeholder="Deadline" />
            <div class="flex flex-1 flex-row gap-1 items-center">
                
                <TagsSelector :fields="groupusers" :placeholder="placeholder" v-model="selectedUsers"></TagsSelector>
                
                <Button variant="outline">Ajouter</Button>

            </div>
        </div>
    </div>

</template>