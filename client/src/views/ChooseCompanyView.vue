<!-- Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
Maintainer: contact@junior-aei.com

This file is part of LATIME.

LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>. -->
<template>
    <Fieldset id="findCompany" class="flex-auto">
        <template #legend>
            <div class="flex align-items-center">
                <span class="pi pi-home mr-2"></span>
                <span class="font-bold">Entreprise</span>
            </div>
        </template>

        <div class="surface-section">
            <ul class="list-none p-0 m-0">
                <li class="row">
                    <div class="key2">Entreprise</div>
                    <span class="p-input-icon-left">
                        <Button
                            label="Trouver une entreprise"
                            @click="searchCompany()"
                        />
                    </span>
                </li>
            </ul>
        </div>
    </Fieldset>
</template>

<script setup lang="ts">
import router from "@/router";

function searchCompany() {
    router.push("/clients/new/newCompany");
}
</script>

<style scoped lang="scss">
@import "primeflex/primeflex.scss";

.row {
    @include styleclass(
        "grid align-items-center py-3 px-2 border-top-1 surface-border"
    );
}

.key1 {
    @include styleclass("md:min-w-max col-3 text-500 font-medium");
}

.key2 {
    @include styleclass("md:min-w-max col-2 text-500 font-medium");
}

.value {
    @include styleclass("col text-left text-900 w-full");
}
</style>
