<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useTaskStore } from './stores/task'
import { Task } from './types/Task'
import { computed } from 'vue'
import TaskFilters from './components/TaskFilters.vue'
import TaskCard from './components/TaskCard.vue'
import TaskForm from './components/TaskForm.vue'
import TaskAnalytics from './components/TaskAnalytics.vue'

const store = useTaskStore()
const showTaskForm = ref(false)
const editingTask: Ref<Task | null> = ref(null)

const filteredTasks = computed(() => store.filteredTasks)

const handleEditTask = (task: Task) => {
  editingTask.value = task
  showTaskForm.value = true
}

const handleCloseForm = () => {
  showTaskForm.value = false
  editingTask.value = null
}
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <div class="header">
          <h1 class="text">Project Manager</h1>
          <v-btn class="button" prepend-icon="mdi-plus" @click="showTaskForm = true">
            New Task
          </v-btn>
        </div>

        <task-filters />

        <div class="tasks-container mb-6">
          <task-card
            v-for="task in filteredTasks"
            :key="task.id"
            :task="task"
            @edit="handleEditTask"
          />
        </div>

        <task-analytics />

        <task-form
          v-model="showTaskForm"
          :editing-task="editingTask"
          @update:model-value="handleCloseForm"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss" src="./assets/global.scss"></style>
