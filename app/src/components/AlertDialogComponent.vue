<template>
  <AlertDialog>
    <AlertDialogTrigger>
      <slot></slot>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          {{ dialogTitle }}
        </AlertDialogTitle>
        <AlertDialogDescription>
          {{ dialogDescription }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Annuler</AlertDialogCancel>
        <AlertDialogAction class="hover:bg-destructive" @click="deleteDocument()"
          >Supprimer</AlertDialogAction
        >
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
defineProps<{
  deleteDocument: (params?: any[]) => void
  dialogDescription: string
  dialogTitle: string
}>()
</script>
