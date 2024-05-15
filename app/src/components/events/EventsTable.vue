<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { columns } from './columns'
import type { EventWithDoc } from '@/types/api'
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const data = ref<EventWithDoc[]>([])

const emit = defineEmits(['reloaded'])

const props = defineProps<{
  needReload?: boolean
}>()

async function getData(): Promise<EventWithDoc[]> {
  // Fetch data from your API here.
  const events = await axios.get(`/event`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const docTypes = await axios.get(`/documentType`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })

  const typeDoc = docTypes.data.data.documentTypes.find(
              (documentType: any) => documentType.type === "Doc lié à un événement"
            )
            console.log(typeDoc)

  const documents = await axios.get(`/document`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })
  const DocEvent = documents.data.data.documents.filter(
              (document: any) => document.typeId == typeDoc.typeId
            )

  const eventWithDocList = events.data.data?.events.map((event: any) => {
    const DocList = DocEvent.filter(
      (document: any) => document.information === event.eventId.toString()
    )
    return {
    ...event,
    documentList: DocList
    }
  })

  function delay(isoDateString: string): number {
    const currentDate = new Date().getTime(); // Convertir la date actuelle en timestamp UNIX
    const endDateTime = new Date(isoDateString).getTime();

    // Calcul de la différence en jours
    return endDateTime - currentDate;
}
  eventWithDocList.sort((eventA: any, eventB: any) => {
        // Récupérer les dates de fin de chaque projet
        const endDateA = new Date(eventA.startDate);
        const endDateB = new Date(eventB.startDate);
        // Calculer les délais en utilisant la fonction delay
        const delayA = delay(endDateA.toISOString());
        const delayB = delay(endDateB.toISOString());
        console.log(eventA.startDate)
        console.log(eventB.startDate)
        console.log(delayA)
        console.log(delayB)
        if ((delayA < 0 )||(delayB < 0)){
          return delayB - delayA;
        }
        // Comparer les délais et retourner le résultat de la comparaison
        return delayA - delayB;
    });


  console.log(eventWithDocList)

  return eventWithDocList

}

async function loadData() {
  data.value = await getData()
}

onMounted(async () => {
  loadData()
})
const needReloadIntern = ref(false)

const updatedEvent = () => {
  console.log('youpi')
  needReloadIntern.value = true
}
watch(
  () => props.needReload,
  async (value) => {
    if (value) {
      loadData();
      emit('reloaded');
    }
  }
);

watch(
  () => needReloadIntern,
  async (value) => {
    if (value) {
      loadData();
      emit('reloaded');
    }
  }
);
</script>

<template>
  <div>
    <DataTable :columns="columns" :data="data" :max_item_by_page="6" @update:event="updatedEvent"/>
  </div>
</template>
