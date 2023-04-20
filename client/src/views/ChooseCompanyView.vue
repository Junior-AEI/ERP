<template>
    <Fieldset id=findCompany class="flex-auto">
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
                                <Button label="Trouver une entreprise" @click="searchCompany()" />
                            </span>
                        </li>
                        </ul>
                    </div>
                </Fieldset>
</template>

<script setup lang="ts">
import router from "@/router";


function searchCompany(){
    router.push("/addCompanies");
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