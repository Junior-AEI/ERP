import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router/index'

export const useAuthStore = defineStore('auth', {
  state: () => {
    if (localStorage.getItem('auth')) return JSON.parse(localStorage.getItem('auth') as string)
    return {
      token: null,
      userId: null,
      memberId: null,
      username: null,
      firstName: null,
      lastName: null
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
          this.token = response.data.token
          this.userId = response.data.userId
          this.memberId = response.data.memberId
          this.username = response.data.username
          this.firstName = response.data.firstName
          this.lastName = response.data.lastName
        })
        .catch((error) => {
          console.log(error)
        })
      return request
    },
    logout() {
      this.token = null
      this.userId = null
      this.memberId = null
      this.username = null
      this.firstName = null
      this.lastName = null
      localStorage.removeItem('auth')
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
