<script setup lang="ts">
import {ref} from "vue"
import axios from "axios"
import {type Group} from "@/types/api"

import {type Field} from "../tagsSelector"
import { useAuthStore } from "@/stores/authStore";


const placeholder = "Attribuer à"
const groupusers = ref<Field[]>([{label:"test", value:"test"},{label:"test2", value:"test2"}])

axios.get("/group").then((response)=>{console.log(response);
    groupusers.value.push(...response.data.data.groups.map((group:Group)=>{return {value:group.groupName, label:group.groupName}}))
    console.log(groupusers.value);
    
 })

const selectedUsers = ref<string[]>([])

const description = ref<string>("")
const dueDate = ref<string>("")

function addTask(){
    console.log("Ajouter une tâche");
    console.log("description :", description.value);
    console.log("dueDate :", dueDate.value);
    console.log("selectedUsers :", selectedUsers.value);
    const issuer = useAuthStore().userId
    if (description.value === "" || dueDate.value === "" || selectedUsers.value.length === 0) {
        console.log("Veuillez remplir tous les champs");
    }
    else {
        axios.post("/task", {description: description.value, dueDate: dueDate.value, issuer: issuer, concerned_user: selectedUsers.value, state:"À faire"}).then((response)=>{console.log(response);})
    }


}




</script>

<template>
  <div class="flex flex-1 flex-col gap-1">
    <h3>Ajouter une tâche :</h3>
    <div class="flex flex-col gap-1">
      <Input type="text" placeholder="ma tâche" v-model="description"/>
      <Input type="date" placeholder="dueDate" v-model="dueDate"/>
      <div class="flex flex-1 flex-row items-center gap-1">
        <TagsSelector
          :fields="groupusers"
          :placeholder="placeholder"
          v-model="selectedUsers"
        ></TagsSelector>

        <Button variant="outline" @click="addTask">Ajouter</Button>
      </div>
    </div>
  </div>
</template>
