<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-vue-next'

import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'

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
            <FormItem class="flex flex-col">
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
          </FormField>
          <FormField v-slot="{ componentField, value }" name="startDate">
            <FormItem class="flex flex-col">
              <FormLabel>Date de début</FormLabel>
              <Popover>
                <PopoverTrigger as-child>
                  <FormControl>
                    <Button
                      variant="outline"
                      :class="
                        cn(
                          'w-[240px] ps-3 text-start font-normal',
                          !value && 'text-muted-foreground'
                        )
                      "
                    >
                      <span>{{ value ? format(value, 'PPP') : '01/01/2024' }}</span>
                      <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent class="p-0">
                  <Calendar v-bind="componentField" />
                </PopoverContent>
              </Popover>
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField, value }" name="endDate">
            <FormItem class="flex flex-col">
              <FormLabel>Date de fin</FormLabel>
              <Popover>
                <PopoverTrigger as-child>
                  <FormControl>
                    <Button
                      variant="outline"
                      :class="
                        cn(
                          'w-[240px] ps-3 text-start font-normal',
                          !value && 'text-muted-foreground'
                        )
                      "
                    >
                      <span>{{ value ? format(value, 'PPP') : '01/01/2024' }}</span>
                      <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent class="p-0">
                  <Calendar v-bind="componentField" />
                </PopoverContent>
              </Popover>
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="location">
            <FormItem>
              <FormLabel>Emplacement</FormLabel>
              <Input
                type="text"
                placeholder="Où est-ce que ça se passe ?"
                v-bind="componentField"
              />
              <FormDescription> </FormDescription>
            </FormItem>
          </FormField>
          <FormField name="description">
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
