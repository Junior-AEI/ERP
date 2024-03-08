import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router/index";

export const useAuthStore = defineStore("auth", {
    state: () => {
        if (localStorage.getItem("auth"))
            return JSON.parse(localStorage.getItem("auth") as string);
        return {
            user_id: null,
            adherent_id: null,
            token: null,
        };
    },
    actions: {
        login(username: string, password: string) {
            const request = axios.post(`${import.meta.env.VITE_API_URL}/login`, {
                nomUtilisateur: username,
                motDePasse: password,
            });
            request
                .then((response) => {
                    console.log(response.data)
                    this.token = response.data.token;
                    this.user_id = response.data.utilisateur_id;
                    this.adherent_id = response.data.adherent_id;
                })
                .catch((error) => {
                    console.log(error);
                });
            return request;
        },
        logout() {
            this.token = null;
            this.user_id = null;
            this.adherent_id = null;
        },
        redirectToLogin() {
            router.push({ name: "Login" });
        },
    },
    getters: {
        decodeJWT(): null | string {
            if (this.token) {
                const base64Url = this.token.split(".")[1];
                const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
                const jsonPayload = decodeURIComponent(
                    atob(base64)
                        .split("")
                        .map(function (c) {
                            return (
                                "%" +
                                ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                            );
                        })
                        .join("")
                );
                return JSON.parse(jsonPayload);
            }
            return null;
        },
        getToken(): null | string {
            return this.token;
        },
        isAuthenticated(): boolean {
            if (this.token) {
                const decodedToken = this.decodeJWT;
                if (decodedToken) {
                    const expirationDate = new Date(
                        decodedToken.exp * 1000
                    ).getTime();
                    const now = new Date().getTime();
                    if (expirationDate > now) {
                        return true;
                    }
                }
            }
            return false;
        },
        getUser(): null | string {
            return this.user;
        },
    },
});
