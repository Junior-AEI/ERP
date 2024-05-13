<template>
  <Card>
    <CardContent>
      <div class="flex flex-1 flex-col justify-start">
        <h3>{{ description }}</h3>
        <div class="flex flex-1 flex-row items-center justify-between">
          <span>{{ duedate.toLocaleDateString('fr-FR') }}</span>

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
import { ref } from 'vue'

const states: string[] = []

const STATE = ['À faire', 'En cours', 'Terminée', 'annulé', 'archivé']

for (let index = 0; index < STATE.length; index++) {
  const element = STATE[index]
  states.push(element)
}

const props = defineProps<{
  taskId: number
  userId: number
  dueDate: string
  description: string
  state: string
  issuerId: number
}>()

const duedate = ref<Date>(new Date(props.dueDate))

/* function changeState() {
  console.log('change state')
  axios.put(`/task/${props.taskId}`, { state: props.state }).then((response) => {
    console.log(response)
  })
} */
</script>
