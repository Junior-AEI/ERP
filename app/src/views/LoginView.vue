<template>
  <div class="flex flex-1 flex-col items-center justify-center sm:p-10">
    <Card class="w-full max-w-xs">
      <form
        @click="
          (e) => {
            e.preventDefault()
            LoginAction
          }
        "
      >
        <CardHeader class="justify-center">
          <img src="/logo.svg" alt="logo" class="h-24" />
        </CardHeader>
        <CardContent>
          <div class="flex flex-col gap-2">
            <Label for="login">Identifiant</Label>
            <Input id="login" v-model="login" placeholder="john.doe" />
          </div>
          <div class="flex flex-col gap-2">
            <Label for="password">Mot de passe</Label>
            <Input id="password" v-model="password" type="password" placeholder="·········" />
          </div>
          <span v-if="error" class="text-sm font-light text-destructive">
            Identifiant ou mot de passe incorrect
          </span>
          <Button class="w-full" @click="LoginAction">Se connecter</Button>
          <Button class="w-full" variant="outline" @click="console.log('Non Implémenté')">
            Mot de passe oublié
          </Button>
        </CardContent>
      </form>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import { useAuthStore } from '@/stores/authStore'
const authStore = useAuthStore()

if (authStore.isAuthenticated) {
  router.push({ path: '/' })
}

const login = ref('')
const password = ref('')
const error = ref(false)

const LoginAction = async () => {
  return authStore
    .login(login.value, password.value)
    .then(() => {
      router.push({ path: '/' })
    })
    .catch(() => {
      login.value = ''
      password.value = ''
      error.value = true
      console.log(error.value)
    })
}
</script>
