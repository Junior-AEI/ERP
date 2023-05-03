import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UsersView from "../views/UsersView.vue";
import ClientsView from "../views/ClientsView.vue";
import PostsView from "../views/PostsView.vue";
import addPost from "../views/AddPoste.vue";
import MemberView from "../views/MemberView.vue";
import MemberUpdateView from "../views/MemberUpdateView.vue";
import AddUserView from "../views/AddUserView.vue";
import AddClientView from "../views/AddClientView.vue";
import ChooseCompanyView from "../views/ChooseCompanyView.vue";

import DocumentView from "../views/DocumentView.vue";
import AddCompanies from "../views/AddCompaniesView.vue";

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
            path: "/users/:id/update",
            name: "updateMember",
            component: MemberUpdateView,
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
            path: "/addpost",
            name: "addpost",
            component: addPost,
        },
        {
            path: "/adduser",
            name: "adduser",
            component: AddUserView,
        },
        {
            path: "/addclient",
            name: "addclient",
            component: AddClientView,
        },

        {
            path: "/choosecompany",
            name: "choosecompany",
            component: ChooseCompanyView,
        },
        {
            path: "/addCompanies",
            name: "addCompanies",
            component: AddCompanies,
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
