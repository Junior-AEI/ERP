import { createApp } from "vue";

import { createPinia } from "pinia";

import App from "./App.vue";

import router from "./router";

//Prime Vue
import PrimeVue from "primevue/config";

import Dropdown from "primevue/dropdown";
import DataTable from "primevue/datatable";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import Row from "primevue/row";
import PanelMenu from "primevue/panelmenu";
import Sidebar from "primevue/sidebar";
import Menubar from "primevue/menubar";
import Breadcrumb from "primevue/breadcrumb";

// import ConfirmationService from 'primevue/confirmationservice';
// import ConfirmPopup from 'primevue/confirmpopup';

import "../src/assets/_theme.scss"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000/api";

const app = createApp(App);
app.use(createPinia());
app.use(router);

app.use(PrimeVue);

app.component("Dropdown", Dropdown);
app.component("DataTable", DataTable);
app.component("Button", Button);
app.component("InputText", InputText);
app.component("Column", Column);
app.component("ColumnGroup", ColumnGroup);
app.component("Row", Row);
app.component("PanelMenu", PanelMenu);
app.component("Sidebar", Sidebar);
app.component("Menubar", Menubar);
app.component("Breadcrumb", Breadcrumb);
// app.component("ConfirmationService", ConfirmationService);
// app.component("ConfirmPopup", ConfirmPopup);

//app.component("FilterMatchMode", FilterMatchMode);

app.mount("#app");
//app.use(vuetify).mount("#app");
