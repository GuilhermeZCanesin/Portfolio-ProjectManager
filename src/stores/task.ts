import { defineStore } from 'pinia'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [
      {
        id: 1,
        title: 'Add Button to Bulk Edit',
        description: 'Implement the ability to change multiple tasks statuses at once',
        status: 'In Progress',
        priority: 'High',
        createdAt: '2024-01-20',
        dueDate: '2024-02-01',
        responsible: 'Guilherme Canesin',
      },
      {
        id: 2,
        title: 'Configure endpoints at the Back End',
        description:
          'Implement the new endpoints for creating, editing and deleting the tasks from the database',
        status: 'Pending',
        priority: 'Medium',
        createdAt: '2024-01-21',
        dueDate: '2024-01-30',
        responsible: 'Guilherme Canesin',
      },
    ],
    filters: {
      status: 'All',
      priority: 'All',
      sortBy: 'createdAt',
    },
  }),

  getters: {
    filteredTasks: (state) => {
      return state.tasks
        .filter((task) => {
          const matchStatus = state.filters.status === 'All' || task.status === state.filters.status
          const matchPriority =
            state.filters.priority === 'All' || task.priority === state.filters.priority
          return matchStatus && matchPriority
        })
        .sort(
          (a, b) =>
            new Date(b[state.filters.sortBy]).getTime() -
            new Date(a[state.filters.sortBy]).getTime(),
        )
    },

    tasksByStatus: (state) => {
      return state.tasks.reduce((acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1
        return acc
      }, {})
    },

    tasksByPriority: (state) => {
      return state.tasks.reduce((acc, task) => {
        acc[task.priority] = (acc[task.priority] || 0) + 1
        return acc
      }, {})
    },
  },

  actions: {
    addTask(task) {
      this.tasks.push({
        ...task,
        id: Date.now(),
        createdAt: new Date().toISOString().split('T')[0],
      })
    },

    updateTask(updatedTask) {
      const index = this.tasks.findIndex((task) => task.id === updatedTask.id)
      if (index !== -1) {
        this.tasks[index] = updatedTask
      }
    },

    deleteTask(taskId) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId)
    },

    setFilters(newFilters) {
      this.filters = { ...this.filters, ...newFilters }
    },
  },
})
