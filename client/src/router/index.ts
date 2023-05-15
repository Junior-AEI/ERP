// Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

// Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
// Maintainer: contact@junior-aei.com

// This file is part of LATIME.

// LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>.
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UsersView from "../views/UsersView.vue";
import ClientsView from "../views/ClientsView.vue";
import PostsView from "../views/PostsView.vue";
import addPost from "../views/AddPoste.vue";
import PostUpdateView from "../views/PostUpdateView.vue";
import MemberView from "../views/MemberView.vue";
import MemberUpdateView from "../views/MemberUpdateView.vue";
import AddUserView from "../views/AddUserView.vue";
import AddClientView from "../views/AddClientView.vue";
import ChooseCompanyView from "../views/ChooseCompanyView.vue";
import LogIn from "../views/LogIn.vue";
import DocumentView from "../views/DocumentView.vue";
import AddCompanies from "../views/AddCompaniesView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Connexion",
            component: LogIn,
            meta: {
                loginPage: true,
            },
        },
        {
            path: "/home",
            name: "Accueil",
            component: HomeView,
        },
        {
            path: "/members",
            children: [
                {
                    path: "",
                    name: "Listes des membres",
                    component: UsersView,
                },
                {
                    path: ":id",
                    children: [
                        {
                            path: "",
                            name: "Détails",
                            component: MemberView,
                        },
                        {
                            path: "update",
                            name: "Modifier un membre",
                            component: MemberUpdateView,
                        },
                    ],
                },
                {
                    path: "new",
                    name: "Nouvel adhérent",
                    component: AddUserView,
                },
            ],
        },
        {
            path: "/posts",
            children: [
                {
                    path: "",
                    name: "Liste des postes",
                    component: PostsView,
                },
                {
                    path: ":id",
                    children: [
                        {
                            path: "update",
                            name: "Modifier",
                            component: PostUpdateView,
                        },
                        {
                            path: "",
                            name: "Poste",
                            redirect: "/posts",
                        },
                    ],
                },
                {
                    path: "new",
                    name: "Nouveau poste",
                    component: addPost,
                },
            ],
        },

        {
            path: "/clients",
            children: [
                {
                    path: "",
                    component: ClientsView,
                    name: "Carnet d'adresse client",
                },
                {
                    path: "new",
                    children: [
                        {
                            path: "",
                            name: "Nouveau client",
                            component: AddClientView,
                        },
                        {
                            path: "chooseCompany",
                            name: "Choix d'une entreprise",
                            component: ChooseCompanyView,
                        },
                        {
                            path: "newCompany",
                            name: "Nouvelle entreprise",
                            component: AddCompanies,
                        },
                    ],
                },
            ],
        },
        {
            path: "/about",
            name: "À propos",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/AboutView.vue"),
        },
        {
            path: "/documents",
            name: "Gestion des documents",
            component: DocumentView,
        },
    ],
});

export default router;
