<template>
  <Wrapper class="flex-col">
    <Card>
      <CardHeader>
        <span class="material-symbols-outlined"> create_new_folder </span>
        <span class="text-accent">Téléverser un document</span>
      </CardHeader>
      <CardContent class="grid gap-4">
        <Dropzone />
        <div v-if="isReady">
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
                      ? documentTypes.find(
                          (documentType) => documentType.value === documentTypeName
                        )?.label
                      : 'Sélectionner le type de document'
                  }}
                  <Icon name="unfold_more" class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent class="p-0">
                <Command>
                  <CommandInput class="h-9" placeholder="Rechercher un document" />
                  <CommandEmpty>Aucun document trouvé</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      <CommandItem
                        v-for="documentType in documentTypes"
                        :key="documentType.value"
                        :value="documentType.value"
                        @select="
                          (ev) => {
                            if (typeof ev.detail.value === 'number') {
                              documentTypeName = ev.detail.value
                            }
                            isOpen = false
                          }
                        "
                      >
                        {{ documentType.label }}
                        <Icon
                          name="check"
                          :class="
                            cn(
                              'ml-auto h-4 w-4',
                              documentTypeName === documentType.value ? 'opacity-100' : 'opacity-0'
                            )
                          "
                        />
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <Input placeholder="1" />
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
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { ref } from 'vue'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'

const isReady = ref(true)
const isOpen = ref(false)

enum documentEnum {
  CE = 1,
  ACE,
  RM,
  FS
}
const documentTypes = [
  { value: documentEnum.CE, label: "Convention d'étude" },
  { value: documentEnum.ACE, label: "Avenant à la convention d'étude" },
  { value: documentEnum.RM, label: 'Récapitulatif de mission' },
  { value: documentEnum.FS, label: 'Facture de solde' }
]

const documentTypeName = ref(NaN)

const uploadDocument = () => {
  console.log('TODO\n')
}
</script>
