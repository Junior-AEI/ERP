<template>
  <div class="flex h-screen flex-1 flex-col items-center justify-center sm:p-10">
    <Card class="w-full max-w-xs">
        <CardHeader class="justify-center">
          <img src="/logo.svg" alt="logo" class="h-24" />
        </CardHeader>
        <CardContent>
          <div class="flex flex-col gap-2">
            <Label for="login">Token (Présent dans le mail)</Label>
            <Input id="login" v-model="token" placeholder="ffrefvneebyu2dyuig" />
          </div>
          <div class="flex flex-col gap-2">
            <Label for="password">Nouveau Mot de passe</Label>
            <Input id="password" v-model="password" type="password" placeholder="·········" />
          </div>
          <div class="flex justify-center">
            <span v-if="error" class="text-sm font-light text-destructive">
              Identifiant ou mot de passe incorrect
            </span>
          </div>
          <Button class="w-full" @click="handleClick">Changer le Mot de Passe</Button>
          <Link to="/login"><Button class="w-full" variant="outline" >
            Revenir à la connexion
          </Button></Link>
          
        </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import { useAuthStore } from '@/stores/authStore'
const authStore = useAuthStore()
import axios from 'axios'
import { useToast } from '@/components/ui/toast/use-toast'

if (authStore.isAuthenticated) {
  router.push({ path: '/' })
}

const token = ref('')
const password = ref('')
const error = ref(false)

const { toast } = useToast()

async function newPassword() {
  await axios
    .post(
      `/new-password`,
      {
        password: password,
        token : token
      },
      {
        headers: {
          Authorization: `Bearer ${useAuthStore().token}`
        }
      }
    )
    .then((response) => {
      console.log(response)
      toast({
        title: 'Mot de Passe mis à jour',
      })
    })
    .catch((error) => {
      console.error(error)
      toast({
        title: 'Something wrong happened',
        variant: 'destructive',
        description: `${error.response.data.message}`
      })
    })
  
}
async function handleClick() {
  await newPassword()
}
</script>
