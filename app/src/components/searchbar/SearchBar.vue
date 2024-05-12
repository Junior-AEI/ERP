<template> 
<div class="min-h-10">

    <Input placeholder="Rechercher" v-model="research"/>
</div>



</template>

<script lang="ts" setup>

import { ref } from 'vue'

const research = ref('')


</script>