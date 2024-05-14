<template>
  <Card>
    <CardContent>
      <div class="flex flex-1 flex-col justify-start">
        <h3>{{ description }}</h3>
        <div class="flex flex-1 flex-row items-center justify-between">
          <span>{{ duedate.toLocaleDateString('fr-FR') }}</span>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <div  :class=badgeColorClass>
                <div class="flex items-center gap-2 ">
                  <span>{{ props.state }}</span>
                  <Icon name="expand_more" />
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem v-if="props.state != 'A faire'" @click="modifyTaskState('A faire')">
                A faire
              </DropdownMenuItem>
              <DropdownMenuItem v-if="props.state != 'En cours'" @click="modifyTaskState('En cours')">
                En cours
              </DropdownMenuItem>
              <DropdownMenuItem v-if="props.state != 'Terminée'" @click="modifyTaskState('Terminée')">
                Terminée
              </DropdownMenuItem>
              <DropdownMenuItem v-if="props.state != 'Annulé'" @click="modifyTaskState('Annulé')">
                Annulée
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
const emit = defineEmits(['update:tasks'])

const props = defineProps<{
  taskId: number
  userId: number
  dueDate: string
  description: string
  state: string
  issuerId: number
}>()

import { useAuthStore } from '@/stores/authStore'

function modifyTaskState( state: string) {
  console.log(props)
  axios
    .put(
      `/task/${props.taskId}`,
      {
        task: {
          taskId: props.taskId,
          userId: props.userId,
          dueDate: props.dueDate,
          issuerId: props.issuerId,
          description: props.description,
          state: state,
        }
      },
      {
        headers: {
          Authorization: `Bearer ${useAuthStore().token}`
        }
      }
    )
    .then(() => {
      bg_color(state)
      emit('update:tasks', [])
      
    })
    .catch((error) => {
      console.error(error)
    })
}

let badgeColorClass = ''
const bg_color = async (state : string) => {
  switch (state) {
        case 'A Faire':
          badgeColorClass = 'bg-gray-200 p-1 rounded mr-2'
          break
        case 'En cours':
          badgeColorClass = 'bg-orange-200 p-1 rounded mr-2'
          break
        case 'Terminée':
          badgeColorClass = 'bg-green-200 p-1 rounded mr-2'
          break
        case 'Annulé':
          badgeColorClass = 'bg-red-200 p-1 rounded mr-2'
          break
        default:
          badgeColorClass = 'bg-gray-200 p-1 rounded mr-2'
      }

}

const duedate = ref<Date>(new Date(props.dueDate))

bg_color(props.state)

</script>
