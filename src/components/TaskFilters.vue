<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <v-select
      v-model="filters.status"
      :items="statusOptions"
      label="Filter By Status"
      @update:model-value="updateFilters('status', $event)"
    />

    <v-select
      v-model="filters.priority"
      :items="priorityOptions"
      label="Filter By Priority"
      @update:model-value="updateFilters('priority', $event)"
    />

    <v-select
      v-model="filters.sortBy"
      :items="sortOptions"
      label="Order By"
      @update:model-value="updateFilters('sortBy', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTaskStore } from '../stores/task'
import { priorityOptionsData, sortOptionsData, statusOptionsData } from '../data/options'

const store = useTaskStore()
const filters = computed(() => store.filters)

const statusOptions = statusOptionsData
const priorityOptions = priorityOptionsData
const sortOptions = sortOptionsData

const updateFilters = (key: string, value: string) => {
  store.setFilters({ [key]: value })
}
</script>
