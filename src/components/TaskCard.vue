<template>
  <v-card class="mb-4">
    <v-card-title class="card-title">
      {{ task.title }}
      <div class="buttons">
        <v-btn icon @click="$emit('edit', task)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon color="error" @click="deleteTask(task.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </v-card-title>

    <v-card-text>
      <p>{{ task.description }}</p>
      <v-row class="card-info">
        <v-col class="info">
          <div class="subtitle">Status</div>
          <div>{{ task.status }}</div>
        </v-col>
        <v-col class="info">
          <div class="subtitle">Priority</div>
          <div>{{ task.priority }}</div>
        </v-col>
        <v-col class="info">
          <div class="subtitle">Responsible</div>
          <div>{{ task.responsible }}</div>
        </v-col>
        <v-col class="info">
          <div class="subtitle">Expiration date</div>
          <div>{{ task.dueDate }}</div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useTaskStore } from '../stores/task'

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
})

if (props) {
}

const store = useTaskStore()
const deleteTask = store.deleteTask

defineEmits(['edit'])
</script>

<style lang="scss">
.card-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .buttons {
    column-gap: 15px;
  }
}
.card-info {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
  margin: -12px;
  .info {
    flex: 0 0 50%;
    max-width: 50%;
  }
  .subtitle {
    font-style: italic;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.6;
  }
}

@media (min-width: 600px) {
  .info {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>
