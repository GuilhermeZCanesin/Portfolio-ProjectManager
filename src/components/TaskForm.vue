<template>
  <v-dialog class="dialog" v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title class="title">
        {{ isEditing ? 'Edit Task' : 'New Task' }}
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="handleSubmit">
          <v-text-field v-model="formData.title" label="Title" required :rules="rules" />

          <v-textarea v-model="formData.description" label="Description" required :rules="rules" />

          <v-select
            v-model="formData.priority"
            :items="priorityOptions"
            label="Priority"
            required
          />

          <v-select
            v-model="formData.status"
            :items="statusOptions"
            label="Status"
            required
            :rules="rules"
          />

          <v-text-field
            v-model="formData.responsible"
            label="Responsible"
            required
            :rules="rules"
          />

          <v-text-field
            v-model="formData.dueDate"
            label="Expiry Date"
            type="date"
            required
            :rules="rules"
          />

          <v-btn class="button" block type="submit" :loading="loading">
            {{ isEditing ? 'Update' : 'Add' }}
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch, type Ref } from 'vue'
import { useTaskStore } from '../stores/task'
import type { Task } from '../types/Task'

const props = defineProps({
  modelValue: Boolean,
  editingTask: Object,
})
const initialForm: Task = {
  title: '',
  description: '',
  status: 'Pending',
  priority: 'Medium',
  responsible: '',
  dueDate: '',
}

const emit = defineEmits(['update:modelValue'])

const store = useTaskStore()
const loading = ref(false)
const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const formData: Ref<Task> = ref(initialForm)

function validateFields() {
  const { title, description, status, priority, responsible, dueDate } = formData.value
  if (title && description && status && priority && responsible && dueDate) return true
  return false
}

function resetFields() {
  formData.value = initialForm
}

const isEditing = computed(() => !!props.editingTask)

const rules = [
  (value: string) => {
    if (value) {
      return true
    }
    return 'Field is required.'
  },
]

const statusOptions = ['Pending', 'In Progress', 'Done']
const priorityOptions = ['Low', 'Medium', 'High']

watch(
  () => props.editingTask,
  (newValue) => {
    if (newValue) {
      formData.value = { ...(newValue as Task) }
    } else {
      resetFields()
    }
  },
  { immediate: true },
)

const handleSubmit = async () => {
  loading.value = true
  if (validateFields()) {
    try {
      if (isEditing.value) {
        await store.updateTask(formData.value)
      } else {
        await store.addTask(formData.value)
        resetFields()
      }
      dialog.value = false
    } finally {
      loading.value = false
    }
  }
  loading.value = false
}
</script>
