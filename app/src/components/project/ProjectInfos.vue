<template>


    <div class="flex flex-1 flex-col max-w-md min-w-72 gap-4 ">
        <div class="flex flex-1 justify-between items-center gap-2 ">
            <span>Nom : </span><span>{{ props.infos.nameProject }}</span>
            <span class="text-muted-foreground ">({{ props.infos.acronym }})</span>
        </div>
        <div class="justify-between items-center gap-2 ">
            <span>Date : </span><span> du {{ convertToCalendarDate(props.infos.startDate) }} au {{
                convertToCalendarDate(props.infos.endDate) }}</span>

            <Dialog>
                <DialogTrigger as-child>
                    <Button variant="outline" class="ml-2">
                        <Icon name="edit" />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Modifier les dates de l'étude</DialogTitle>
                    </DialogHeader>
                    <div class="flex items-end gap-4">
                        <div class="flex flex-1 flex-col gap-2">
                            <Label for="legalEntity">Date de Debut : {{ convertToCalendarDate(props.infos.startDate)  }}</Label>
                            <DatePickerComponent v-model="startDateFormat" />
                        </div>
                        <div class="flex flex-1 flex-col gap-2">
                            <Label for="legalEntity">Date de Fin : {{ convertToCalendarDate(props.infos.endDate) }}</Label>
                            <DatePickerComponent v-model="endDateFormat" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose as-child>
                            <Button @click="updateDate()" type="submit"> Enregistrer les modifications </Button>
                        </DialogClose>

                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
        <div class="flex flex-1 justify-between items-center gap-2 ">
            <span>Client : </span><span>{{ props.infos.firstname }} {{ props.infos.lastname }} de {{ props.infos.name
                }}</span>
        </div>
        <div class="flex flex-1 justify-between items-center gap-2 ">
            <span>Chargé d'Étude : </span>
            <div class="flex flex-wrap">
                <div v-for="(manager, index) in props.infos.projectManagers" :key="manager.firstname"
                    class="flex flex-row items-center justify-start">
                    {{ manager.firstname }} {{ manager.lastname }}
                    <span v-if="index !== props.infos.projectManagers.length - 1"> / </span>


                </div>

            </div>
            <Dialog>
                <DialogTrigger as-child>
                    <Button variant="outline" class="ml-2">
                        <Icon name="add" />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Ajouter un chargé d'étude</DialogTitle>
                    </DialogHeader>
                    <Combobox @input="handleInputManager" :options="userList" :comboboxLabel="'Selectionner le chargé'">
                    </Combobox>
                    <DialogFooter>
                        <DialogClose as-child>
                            <Button @click="updateProjectManager()" type="submit"> Ajouter </Button>
                        </DialogClose>

                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
        <div class="gap-2 ">
            <span>Intervenants : </span>
            <div class="flex flex-wrap">
                <template v-for="(contributor, index) in props.infos.contributors" :key=" contributor.firstname">
                    {{ contributor.firstname }} {{ contributor.lastname }}
                    <span v-if="index !== (props.infos.contributors.length - 1)"> / </span>
                </template>
            </div>
            <Dialog>
                <DialogTrigger as-child>
                    <Button variant="outline" class="ml-2">
                        <Icon name="add" />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Ajouter un chargé d'étude</DialogTitle>
                    </DialogHeader>
                    <Combobox @input="handleInputContributor" :options="memberList"
                        :comboboxLabel="'Selectionner l\intervenant'">
                    </Combobox>
                    <DialogFooter>
                        <DialogClose as-child>
                            <Button @click="updateContributor()" type="submit"> Ajouter </Button>
                        </DialogClose>

                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>

    </div>


</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { ref, onMounted } from 'vue'
import { type DateValue } from '@internationalized/date'
import { type ExtendedProject, type Project } from '@/types/api'
import axios from 'axios'
import { useToast } from '@/components/ui/toast/use-toast'

import { useAuthStore } from '@/stores/authStore'
const emit = defineEmits(['update:project'])

const props = defineProps<{
    infos: ExtendedProject
}>()


const form = ref<Project>({
    clientId: props.infos.clientId,
    acronym: props.infos.acronym,
    startDate: props.infos.startDate,
    endDate: props.infos.endDate,
    projectId: props.infos.projectId,
    nameProject: props.infos.nameProject
})


const endDateFormat = ref<DateValue>()
const startDateFormat = ref<DateValue>()
const newProjectManager = ref<number>()
const handleInputManager = (value: string) => {
    newProjectManager.value = parseInt(value)
}
const newContributor = ref<number>()
const handleInputContributor = (value: string) => {
    newContributor.value = parseInt(value)
}
import {
    CalendarDateTime,
    parseDateTime,
    DateFormatter,
    getLocalTimeZone
} from '@internationalized/date'


const df = new DateFormatter('fr-FR', {
    dateStyle: 'long'
})
function convertToCalendarDate(isoDateString: string): string {
    const dateObject = new Date(isoDateString)

    // Check if the date object is valid
    if (isNaN(dateObject.getTime())) {
        throw new Error('Invalid date string')
    }

    // Extract year, month, and day from the date object
    const year = dateObject.getFullYear()
    const month = dateObject.getMonth() + 1 // Months are 0-based in JavaScript
    const day = dateObject.getDate()
    const hour = dateObject.getHours()
    const minute = dateObject.getMinutes()

    const date = new CalendarDateTime(year, month, day, hour, minute)
    // Create and return a new CalendarDate object
    const dateFormat = date.toString()
    return df.format(parseDateTime(dateFormat).toDate(getLocalTimeZone()))
}

console.log(props.infos);


async function getDataUser(): Promise<{ value: string; label: string }[]> {
    // Fetch data from your API here.

    const users = await axios.get(`/user`, {
        headers: {
            Authorization: `Bearer ${useAuthStore().token}`
        }
    })

    const persons = await axios.get(`/person`, {
        headers: {
            Authorization: `Bearer ${useAuthStore().token}`
        }
    })

    const UsersInfo = users.data.data?.users.map((user: any) => {
        const person = persons.data.data?.persons.find((person: any) => person.personId === user.userId)
        return {
            value: person.personId.toString(),
            label: `${person.firstname} ${person.lastname}`
        }
    })

    return UsersInfo
}
async function getDataMember(): Promise<{ value: string; label: string }[]> {
    // Fetch data from your API here.

    const members = await axios.get(`/member`, {
        headers: {
            Authorization: `Bearer ${useAuthStore().token}`
        }
    })

    const persons = await axios.get(`/person`, {
        headers: {
            Authorization: `Bearer ${useAuthStore().token}`
        }
    })

    const membersInfo = members.data.data?.members.map((member: any) => {
        const person = persons.data.data?.persons.find((person: any) => person.personId === member.memberId)
        return {
            value: person.personId.toString(),
            label: `${person.firstname} ${person.lastname}`
        }
    })

    return membersInfo
}

const userList = ref([] as { value: string; label: string }[]) // Initialisation d'une liste réactive vide
const memberList = ref([] as { value: string; label: string }[]) // Initialisation d'une liste réactive vide

onMounted(async () => {
    userList.value = await getDataUser()
    memberList.value = await getDataMember()

})

const { toast } = useToast()


const updateContributor = async () => {
    // Crée un objet pour envoyer en requête
    if (newContributor.value) {
        await axios
            .post(
                `/contributor/`,
                {
                    contributor: {
                        memberId: newContributor.value,
                        projectId: form.value.projectId,
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${useAuthStore().token}`
                    }
                }
            )
            .then(() => {
                toast({
                    title: 'Intervenant Ajouté',
                })
                emit('update:project')
            })
            .catch((error) => {
                console.error(error)
                toast({
                    title: 'Something wrong happened',
                    variant: 'destructive',
                    description: `${error.response.data.message}`
                })
            })
    }

}
const updateProjectManager = async () => {
    // Crée un objet pour envoyer en requête
    if (newProjectManager.value) {
        await axios
            .post(
                `/projectManager/`,
                {
                    projectManager: {
                        userId: newProjectManager.value,
                        projectId: form.value.projectId,
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${useAuthStore().token}`
                    }
                }
            )
            .then(() => {
                toast({
                    title: 'Chargé d\'étude Ajouté',
                })
                emit('update:project')
            })
            .catch((error) => {
                console.error(error)
                toast({
                    title: 'Something wrong happened',
                    variant: 'destructive',
                    description: `${error.response.data.message}`
                })
            })
    }

}

async function updateDate() {
    if (startDateFormat.value) {
        form.value.startDate = startDateFormat.value.toString()
    }
    if (endDateFormat.value) {
        form.value.endDate = endDateFormat.value.toString()
    }
    console.log(form.value.startDate)
    await axios
        .put(
            `/project/${form.value.projectId}`,
            {
                project: {
                    projectId: form.value.projectId,
                    clientId: form.value.clientId,
                    startDate: form.value.startDate,
                    endDate: form.value.endDate,
                    acronym: form.value.acronym,
                    name: form.value.nameProject
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`
                }
            }
        )
        .then((response) => {
            console.log(response)
            toast({
                title: 'Dates de l\'étude modifiées',
                description: `${response.data.data.project}`
            })
            emit('update:project')

        })
        .catch((error) => {
            console.error(error)
            toast({
                title: 'Something wrong happened',
                variant: 'destructive',
                description: `${error.response.data.message}`
            })
        })
}

</script>
