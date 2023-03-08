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
import Card from "primevue/card";
import Checkbox from "primevue/checkbox";

import ConfirmationService from "primevue/confirmationservice";
import ConfirmDialog from "primevue/confirmdialog";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";

import "../src/assets/_theme.scss"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css";
/*import "primeflex/primeflex.css";*/

import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000/api";

const app = createApp(App);
app.use(createPinia());
app.use(router);

app.use(PrimeVue);
app.use(ConfirmationService);
app.use(ToastService);

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
app.component("Card", Card);
app.component("Checkbox", Checkbox);
app.component("ConfirmationService", ConfirmationService);
app.component("ConfirmDialog", ConfirmDialog);
app.component("Toast", Toast);
app.component("ToastService", ToastService);
app.mount("#app");
//app.use(vuetify).mount("#app");

axios.interceptors.request.use(
    (config) => {
        config.headers["Authorization"] = `Bearer ${sessionStorage.getItem(
            "token"
        )}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
