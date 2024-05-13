<template>
  <div class="flex flex-col gap-2">
    <Input placeholder="Rechercher" v-model="research" />

    <Card class="max-h-44">
      <ScrollArea class="flex h-full flex-col gap-1">
        <CardContent class="h-full pr-3">

          <CondencedContributor v-for="contributor in res" :infos="contributor">
          </CondencedContributor>

        </CardContent>
      </ScrollArea>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { type FullMember } from '@/types/api'
import { useAuthStore } from '@/stores/authStore'
import { SortDesc } from 'lucide-vue-next'
import { sortingFns } from '@tanstack/vue-table'
import { computed } from 'vue'

const research = ref('')
const results = ref<FullMember[]>([])

function result() {
  return contributors.value.filter((contributor) => {
    const fields: string = Object.values(contributor).join(' ').toLocaleLowerCase()
    return fields.includes(research.value.toLowerCase())
  })
}

const res = computed(result)

const contributors = ref<FullMember[]>([])
const authStore = useAuthStore()



axios.get(`/contributor/`, {
    headers: {
      Authorization: `Bearer ${authStore.token}`
    }
  })
  .then((response) => {
   
    contributors.value.push(...response.data.data.contributors)
    
    
    contributors.value.forEach((element) => {

      axios.get(`/member/${element.memberId}`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`
        }
      }
      ).then((response1) => {
        
        element.memberId = response1.data.data.member.memberId
        element.birthDate = response1.data.data.member.birthDate
        element.birthPlace = response1.data.data.member.birthPlace
        element.nationality = response1.data.data.member.nationality
        element.promotion = response1.data.data.member.promotion
        element.contributionDate = response1.data.data.member.contributionDate
        element.paymentMethod = response1.data.data.member.paymentMethod
        element.department = response1.data.data.member.department
        element.membershipNumber = response1.data.data.member.membershipNumber

        axios.get(`/person/${response1.data.data.member.memberId}`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        })
          .then((response2) => {

            element.firstname = response2.data.data.person.firstname
            element.lastname = response2.data.data.person.lastname
            element.gender = response2.data.data.person.gender
            element.mobilePhone = response2.data.data.person.mobilePhone
            element.landlinePhone = response2.data.data.person.landlinePhone
            element.email = response2.data.data.person.email

          })
      })
    })
  })


console.log('contributors :', contributors.value);

</script>