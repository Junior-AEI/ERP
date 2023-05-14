<!-- Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
Maintainer: contact@junior-aei.com

This file is part of LATIME.

LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>. -->
<template>
    <div class="flex justify-content-center">
        <MemberUpdateComponent :id_user="my_id" />
    </div>
</template>

<script setup lang="ts">
import MemberUpdateComponent from "../components/MemberUpdateComponent.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const my_id = route.params.id;
</script>

<style scoped lang="scss">
@import "/node_modules/primeflex/primeflex.css";
@media (min-width: 1024px) {
    .user {
        margin: 4em;
    }
}
</style>
