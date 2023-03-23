import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UsersView from "../views/UsersView.vue";
import ClientsView from "../views/ClientsView.vue";
import PostsView from "../views/PostsView.vue";
import MemberView from "../views/MemberView.vue";
import AddUserView from "../views/AddUserView.vue";
import DocumentView from "../views/DocumentView.vue";

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
            path: "/users/:id",
            name: "member",
            component: MemberView,
        },
        {
            path: "/clients",
            name: "clients",
            component: ClientsView,
        },
        {
            path: "/posts",
            name: "posts",
            component: PostsView,
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
        {
            path: "/doc",
            name: "doc",
            component: DocumentView,
        },
    ],
});

export default router;
