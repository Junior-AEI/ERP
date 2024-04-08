<template>
  <div class="flex flex-col gap-3 md:flex-row">
    <Wrapper class="flex-2 flex-col">
      <RadioGroup default-value="members" class="grid grid-cols-3 gap-4">
        <div>
          <RadioGroupItem id="members" value="members" class="peer sr-only" />
          <Label
            for="members"
            class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            Ajouter un membre
          </Label>
        </div>
        <div>
          <RadioGroupItem id="role" value="role" class="peer sr-only" />
          <Label
            for="role"
            class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            Modifier la liste des postes
          </Label>
        </div>
        <div>
          <RadioGroupItem id="pole" value="pole" class="peer sr-only" />
          <Label
            for="pole"
            class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            Modifier la liste des pôles
          </Label>
        </div>
      </RadioGroup>
    </Wrapper>
  </div>
</template>

<script lang="ts" setup></script>
