<template>
  <Wrapper class="flex-col">
    <Card>
      <CardHeader>
        <span class="material-symbols-outlined"> create_new_folder </span>
        <span class="text-accent">Téléverser un document</span>
      </CardHeader>
      <CardContent class="grid gap-4">
        <Dropzone />
        <div v-if="hasDoc">
          <div class="grid grid-cols-2 gap-2">
            <Label>Type de document</Label>
            <Label> Version du document </Label>
            <Popover v-model:open="isOpen">
              <PopoverTrigger as-child>
                <Button
                  variant="outline"
                  role="combobox"
                  :aria-expanded="isOpen"
                  class="justify-between"
                >
                  {{
                    documentTypeName
                      ? documentTypes.find((documentType) => documentType.type === documentTypeName)
                          ?.type
                      : 'Sélectionner le type de document'
                  }}
                  <Icon name="unfold_more" class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent class="p-0">
                <Command>
                  <CommandList>
                    <CommandGroup>
                      <CommandItem
                        v-for="documentType in documentTypes"
                        :key="documentType.typeId"
                        :value="documentType.type"
                        @select="
                          (ev) => {
                            if (typeof ev.detail.value === 'string') {
                              documentTypeName = ev.detail.value
                            }
                            isOpen = false
                          }
                        "
                      >
                        {{ documentType.type }}
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <Input placeholder="1" />
          </div>
          <div v-if="documentTypeName">
            <div
              v-for="(field, index) in documentStringParse(
                documentTypes.find((documentType) => documentType.type === documentTypeName)
                  ?.fieldMeaning ?? ''
              )"
              :key="index"
            >
              <div class="flex-col gap-2">
                <Label>{{ field }}</Label>
                <Input v-if="field != 'Date de fin de validité'" v-model="documentInfos[index]" />
                <Input
                  v-else
                  type="date"
                  v-model="documentInfos[index]"
                  placeholder="Date de fin de validité"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button class="w-full" @click="uploadDocument()"> Téléverser un document</Button>
      </CardFooter>
    </Card>
  </Wrapper>
</template>

<script setup lang="ts">
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import type { DocumentType } from '@/types/api'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { ref, onMounted } from 'vue'
import { Input } from '@/components/ui/input'

const hasDoc = ref(false)
const isOpen = ref(false)

/* Values for document information storage */
const documentTypes = ref<DocumentType[]>([])

const documentTypeName = ref('')
const documentInfos = ref<string[]>([])

/* Utils functions for parsing strings */
const documentStringParse = (documentTypeFields: string): string[] => {
  return documentTypeFields.split('|')
}

const documentStringJoin = (documentTypeFields: string[]): string => {
  return documentTypeFields.join('|')
}

const verifyFields = (documentTypeFields: string[], documentTypeName: string): boolean => {
  const fieldNumber =
    documentTypes.value.find((documentType) => documentType.type === documentTypeName)
      ?.fieldNumber ?? 0
  for (let i = 0; i < fieldNumber; i++) {
    if (!documentTypeFields[i]) {
      return false
    }
  }
  return true
}

/* axios requests */
async function getDocumentType(): Promise<DocumentType[]> {
  const response = await axios.get(`/documentType`, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    }
  })
  return response.data.data.documentTypes
}

const uploadDocument = () => {
  console.log(documentInfos.value, documentTypeName.value)
  if (!documentTypeName.value || !verifyFields(documentInfos.value, documentTypeName.value)) {
    alert("Tous les champs n'ont pas été remplis")
  } else {
    console.log('TODO: Upload document')
  }
}

onMounted(async () => {
  documentTypes.value = await getDocumentType()
})
</script>
