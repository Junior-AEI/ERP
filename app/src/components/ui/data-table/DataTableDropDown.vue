// DataTableDropDown.vue
<script setup lang="ts">
defineProps<{
  item: {
    id: string
  }
}>()

function copy(id: string) {
  navigator.clipboard.writeText(id)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="h-8 w-8 p-0">
        <span class="sr-only">Open menu</span>
        <Icon name="more_horiz" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="copy(item.id)"> Copy payment ID </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
