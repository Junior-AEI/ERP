<template>
  <Wrapper class="flex-col">
    <Card>
      <CardHeader>
        <span class="material-symbols-outlined"> create_new_folder </span>
        <span class="text-accent">Téléverser un document</span>
      </CardHeader>
      <CardContent class="grid gap-4">
        <Dropzone v-model="files" />
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
            <Input type="number" v-model="version" placeholder="1" />
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
  <Toaster />
</template>

<script setup lang="ts">
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import type { DocumentType } from '@/types/api'
import { computed, ref, onMounted } from 'vue'
import { useToast } from '@/components/ui/toast/use-toast'
import { Toaster } from '@/components/ui/toast'

const hasDoc = computed(() => files.value.length > 0)
const isOpen = ref(false)
const { toast } = useToast()

/* Values for document information storage */
const documentTypes = ref<DocumentType[]>([])

const version = ref(NaN)
const documentTypeName = ref('')
const documentInfos = ref<string[]>([])
const status = ref('A relire')
const authorId = ref(useAuthStore().userId)

const files = ref<File[]>([])

/* Utils functions for parsing strings */
const documentStringParse = (documentTypeFields: string): string[] => {
  return documentTypeFields.split('|')
}

const documentStringJoin = (documentTypeFields: string[]): string => {
  return documentTypeFields.join('|')
}

const verifyFields = (documentTypeFields: string[], fieldNumber: number): boolean => {
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
  const fieldNumber =
    documentTypes.value.find((documentType) => documentType.type === documentTypeName.value)
      ?.fieldNumber ?? 0 // should not be equal to 0
  if (!documentTypeName.value || !verifyFields(documentInfos.value, fieldNumber)) {
    toast({
      title: 'Something wrong happened',
      variant: 'destructive',
      description: `All the fields must be filled.`
    })
  } else {
    const response = axios
      .post(
        `/document`,
        {
          document: {
            path: 'path/to/file', // TODO : put actual path
            version: version.value,
            typeId:
              documentTypes.value.find(
                (documentType) => documentType.type === documentTypeName.value
              )?.typeId ?? 0, // should not be equal to 0
            information: documentStringJoin(documentInfos.value),
            status: status.value,
            authorId: authorId.value,
            createdAt: new Date()
          }
        },
        {
          headers: {
            Authorization: `Bearer ${useAuthStore().token}`
          }
        }
      )
      .then(() => {
        console.log(response)
        location.reload()
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

onMounted(async () => {
  documentTypes.value = await getDocumentType()
})
</script>
