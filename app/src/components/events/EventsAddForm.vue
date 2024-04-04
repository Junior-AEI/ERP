<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2).max(50)
  })
)

const form = useForm({
  validationSchema: formSchema
})

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values)
})

const isOpen = ref(false)
</script>

<template>
  <Wrapper class="flex-col">
    <Card>
      <CardHeader>
        <span class="material-symbols-outlined"> calendar_add_on </span>
        <span class="text-accent">Ajouter un événement</span>
      </CardHeader>
      <CardContent>
        <form @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="username">
            <FormItem>
              <FormLabel>Nom de l'événement</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Formation Alten : Être performant face à un intervenant"
                  v-bind="componentField"
                />
                <FormDescription> </FormDescription>
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel>Emplacement</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Où est-ce que ça se passe ?"
                  v-bind="componentField"
                />
              </FormControl>
              <FormDescription> </FormDescription>
            </FormItem>
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Une description très fournie. Elle peut être sur plusieurs lignes."
                />
              </FormControl>
              <FormDescription> </FormDescription>
            </FormItem>
          </FormField>
          <Button variant="outline" type="submit"> Ajouter un événement </Button>
        </form>
      </CardContent>
    </Card>
  </Wrapper>
</template>
