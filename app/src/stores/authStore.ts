import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router/index'
import { useLocalStorage } from '@vueuse/core'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      token: useLocalStorage('token', ''),
      userId: useLocalStorage('userId', 0),
      username: useLocalStorage('username', ''),
      firstName: useLocalStorage('firstName', ''),
      lastName: useLocalStorage('lastName', '')
    }
  },
  actions: {
    login(username: string, password: string) {
      const request = axios.post('/login', {
        username: username,
        password: password
      })
      request
        .then((response) => {
          console.log(response.data)
          this.token = response.data.data.token
          this.userId = response.data.data.userId
          this.username = response.data.data.username
          this.firstName = response.data.data.firstName
          this.lastName = response.data.data.lastName
          console.log(this.lastName)
        })
        .catch((error) => {
          console.log(error)
        })
      return request
    },
    logout() {
      this.token = ''
      this.userId = 0
      this.username = ''
      this.firstName = ''
      this.lastName = ''
      this.redirectToLogin()
    },
    redirectToLogin() {
      router.push({ path: '/login' })
    }
  },
  getters: {
    decodeJWT(): null | string {
      if (this.token) {
        const base64Url = this.token.split('.')[1]
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map(function (c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            })
            .join('')
        )
        return JSON.parse(jsonPayload)
      }
      return null
    },
    isAuthenticated(): boolean {
      if (this.token) {
        const decodedToken = this.decodeJWT
        if (decodedToken) {
          /* @ts-ignore */
          const expirationDate = new Date(decodedToken.exp * 1000).getTime()
          const now = new Date().getTime()
          if (expirationDate > now) {
            return true
          }
        }
      }
      return false
    }
  }
})
