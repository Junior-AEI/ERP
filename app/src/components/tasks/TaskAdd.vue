
<script setup lang="ts">
import {ref} from "vue"
import axios from "axios"
import {type Group} from "@/types/api"

import {type Field} from "../tagsSelector"


const placeholder = "Attribuer à"
const groupusers = ref<Field[]>([{label:"test", value:"test"},{label:"test2", value:"test2"}])

axios.get("/group").then((response)=>{console.log(response);
    groupusers.value.push(...response.data.data.groups.map((group:Group)=>{return {value:group.groupName, label:group.groupName}}))
    console.log(groupusers.value);
    
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