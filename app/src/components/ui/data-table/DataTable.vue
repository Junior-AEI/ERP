<script setup lang="ts" generic="TData, TValue">
import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState
} from '@tanstack/vue-table'
import { ref } from 'vue'
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel
} from '@tanstack/vue-table'

import { valueUpdater } from '@/lib/utils'

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  max_item_by_page?: number; // Rendre max_item_by_page optionnel
}>()


let Max_item_by_page = 10
if(props.max_item_by_page){
  Max_item_by_page= props.max_item_by_page
}
const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})

const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return props.columns
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
  getFilteredRowModel: getFilteredRowModel(),
  state: {
    get sorting() {
      return sorting.value
    },
    get columnFilters() {
      return columnFilters.value
    },
    get columnVisibility() {
      return columnVisibility.value
    }
  }
})

table.setPageSize(Max_item_by_page)

const setFilterModelValue = (event: string | number) => {
  table.setGlobalFilter(event)
}

const emit = defineEmits(['click:row'])

const handleClickFn = (row: any, e: any) => {
  if (e.target.tagName === 'DIV') {
    return emit('click:row', row.original)
  }
}
</script>

<template>
  <div class="flex items-center gap-2 py-4">
    <Input
      class="max-w-sm"
      placeholder="Rechercher"
      @update:model-value="setFilterModelValue($event)"
    />
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="outline" class="ml-auto">
          Colonnes
          <Icon name="expand_more" class="ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuCheckboxItem
          v-for="column in table.getAllColumns().filter((column) => column.getCanHide())"
          :key="column.id"
          class="capitalize"
          :checked="column.getIsVisible()"
          @update:checked="
            (value: boolean) => {
              column.toggleVisibility(!!value)
            }
          "
        >
          {{
            (() => {
              if (column.columnDef) {
                if (column.columnDef.meta) {
                  if ('label' in column.columnDef.meta) {
                    return column.columnDef.meta.label
                  }
                }
              }
              return column.id
            })()
          }}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
  <div class="rounded-md border">
    <Table>
      <TableHeader>
        <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <TableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <TableRow
            @click="handleClickFn(row, $event)"
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined"
          >
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow>
            <TableCell :colSpan="columns.length" class="h-24 text-center">
              Pas de résultats.
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>
  <div class="flex items-center justify-end space-x-2 py-4" v-if="table.getPageCount() > 1">
    <Button
      variant="outline"
      size="sm"
      :disabled="!table.getCanPreviousPage()"
      @click="table.previousPage()"
    >
      Précédent
    </Button>
    <Button
      variant="outline"
      size="sm"
      :disabled="!table.getCanNextPage()"
      @click="table.nextPage()"
    >
      Suivant
    </Button>
  </div>
</template>
