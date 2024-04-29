<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { Button } from '../ui/button'
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline" class="">
        <span class="material-symbols-outlined"> edit_calendar </span>
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Modifier un événement</DialogTitle>
      </DialogHeader>
      <EventsEditEvent />
      <DialogFooter>
        <Button type="submit"> Enregistrer les modifications </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
