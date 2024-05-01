<template>
  <Card>
    <CardContent>
      <div class="flex flex-1 flex-col justify-start">
        <h3>{{ title }}</h3>
        <div class="flex flex-1 flex-row items-center justify-between">
          <span>{{ deadline.toLocaleDateString('fr-FR') }}</span>

          <Select>
            <SelectTrigger class="w-[150px]">
              <SelectValue :placeholder="state" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Etats</SelectLabel>
                <SelectItem value="to do"> À faire </SelectItem>
                <SelectItem value="work in progress"> En cours </SelectItem>
                <SelectItem value="done"> Terminée </SelectItem>
                <SelectItem value="canceled"> Annulé </SelectItem>
                <SelectItem value="archived"> Archivé </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <!-- <Button icon="delete" variant="outline_destructive"></Button> -->
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { STATUS_CODES } from 'http'

const states: string[] = []

const STATE = ['À faire', 'En cours', 'Terminée', 'annulé', 'archivé']

for (let index = 0; index < STATE.length; index++) {
  const element = STATE[index]
  states.push(element)
}

defineProps<{
  id: number
  title: string
  deadline: Date
  user: number
  concerned_user: number
  state: string
}>()
</script>
