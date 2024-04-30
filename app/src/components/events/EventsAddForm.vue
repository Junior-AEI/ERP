<template>
  <Wrapper class="flex-col">
    <Card>
      <CardHeader>
        <span class="material-symbols-outlined"> calendar_add_on </span>
        <span class="text-accent">Ajouter un événement</span>
      </CardHeader>
      <CardContent class="grid gap-4">
        <div class="grid grid-cols-2 gap-2">
          <Label>Nom de l'événement</Label>
          <Label>Emplacement</Label>
          <Input placeholder="Formation Alten : être performant face à un intervenant" />
          <Input placeholder="Où est-ce que ca se passe ?" />
        </div>
        <div class="grid grid-cols-2 gap-2">
          <Label>Date de début </Label>
          <Label>Date de fin</Label>
          <Popover>
            <PopoverTrigger as-child>
              <Button variant="outline">
                <CalendarIcon class="mr-2 h-4 w-4" />
                <span>{{
                  dateBegin
                    ? format(dateBegin, 'PPP - HH:mm', { locale: fr })
                    : '1 janvier 2024 - 00:00'
                }}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0">
              <Calendar v-model="dateBegin" mode="datetime" />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger as-child>
              <Button variant="outline">
                <CalendarIcon class="mr-2 h-4 w-4" />
                <span>{{
                  dateEnd
                    ? format(dateEnd, 'PPP - HH:mm', { locale: fr })
                    : '1 janvier 2024 - 00:00'
                }}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0">
              <Calendar v-model="dateEnd" mode="datetime" time-format="24" />
            </PopoverContent>
          </Popover>
        </div>
        <div class="grid gap-2">
          <Label>Description</Label>
          <Textarea
            placeholder="Une description très fournie. Elle peut être sur plusieurs lignes."
          />
        </div>
        <div class="grid gap-2">
          <Label for="document">Ajouter une pièce jointe</Label>
          <Input id="document" type="file" />
        </div>
        <div class="grid gap-4">
          <Collapsible v-model:open="isOpen">
            <CollapsibleTrigger>
              <div class="item-center flex gap-2">
                Notifier certaines personnes
                <span class="material-symbols-outlined"> unfold_more </span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div class="flex items-center space-x-2">
                <Checkbox id="bureau" />
                <label> Bureau </label>
              </div>
              <div class="flex items-center space-x-2">
                <Checkbox id="administration" />
                <label> Conseil d'administration </label>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardContent>
      <CardFooter>
        <Button class="w-full"> Ajouter un événement</Button>
      </CardFooter>
    </Card>
  </Wrapper>
</template>

<script setup lang="ts">
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import type { Event } from '@/types/api'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ref } from 'vue'
import { Checkbox } from '@/components/ui/checkbox'

import { fr } from 'date-fns/locale'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

const isOpen = ref(false)
const dateBegin = ref<Date>()
const dateEnd = ref<Date>()

const eventInfo = ref<Event>({
  eventId: NaN,
  name: '',
  startDate: new Date(),
  endDate: new Date(),
  location: '',
  description: '',
  eventTypeName: ''
})
</script>
