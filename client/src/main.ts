import { createApp } from "vue";

import { createPinia } from "pinia";

import App from "./App.vue";

import router from "./router";

//Prime Vue
import PrimeVue from 'primevue/config';

import DataTable from 'primevue/datatable';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';    
import Row from 'primevue/row'; 


import "primevue/resources/themes/saga-blue/theme.css"      //theme
import "primevue/resources/primevue.min.css"                 //core css
import "primeicons/primeicons.css"     

// Vuetify
// import "vuetify/styles";
// import { createVuetify } from "vuetify";
// import * as components from "vuetify/components";
// import * as directives from "vuetify/directives";

// const vuetify = createVuetify({
//     components,
//     directives,
// });

const app = createApp(App);
app.use(createPinia());
app.use(router);


app.use(PrimeVue);

app.component("DataTable", DataTable);
app.component("Button", Button);
app.component("InputText", InputText);
app.component("Column", Column);
app.component("ColumnGroup", ColumnGroup);
app.component("Row", Row);
//app.component("FilterMatchMode", FilterMatchMode);

app.mount("#app");
//app.use(vuetify).mount("#app");
