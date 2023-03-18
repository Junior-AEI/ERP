import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UsersView from "../views/UsersView.vue";
import ClientsView from "../views/ClientsView.vue";
import AddUserView from "../views/AddUserView.vue";

import axios from "axios";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/users",
            name: "users",
            component: UsersView,
        },
        {
            path: "/clients",
            name: "clients",
            component: ClientsView,
        },
        {
            path: "/adduser",
            name: "adduser",
            component: AddUserView,
        },
        {
            path: "/about",
            name: "about",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/AboutView.vue"),
        },
    ],
});

export default router;
