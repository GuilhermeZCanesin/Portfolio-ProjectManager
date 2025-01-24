<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <v-card>
      <v-card-title>Tasks by Status</v-card-title>
      <v-card-text>
        <apexchart type="pie" :options="chartOptions" :series="statusSeries" />
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title>Tasks by Prioridade</v-card-title>
      <v-card-text>
        <apexchart type="bar" :options="chartOptions" :series="prioritySeries" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTaskStore } from '../stores/task'

const store = useTaskStore()

const statusSeries = computed(() => {
  const data = store.tasksByStatus
  return Object.values(data)
})

const prioritySeries = computed(() => {
  const data = store.tasksByPriority
  return [
    {
      name: 'Tasks',
      data: Object.values(data),
    },
  ]
})

const chartOptions = {
  labels: ['Pending', 'In Progress', 'Done'],
  colors: ['#FF9800', '#2196F3', '#4CAF50'],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: '100%',
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
}
</script>
