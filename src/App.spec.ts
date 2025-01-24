/* eslint-disable @typescript-eslint/no-explicit-any */
import { mount, VueWrapper } from '@vue/test-utils'
import { createPinia } from 'pinia'
import App from './App.vue'
import { useTaskStore } from './stores/task.ts'

jest.mock('./components/TaskFilters.vue', () => ({
  name: 'TaskFilters',
  template: '<div class="task-filters"></div>',
}))

jest.mock('./components/TaskCard.vue', () => ({
  name: 'TaskCard',
  template: '<div class="task-card"></div>',
}))

jest.mock('./components/TaskForm.vue', () => ({
  name: 'TaskForm',
  template: '<div class="task-form"></div>',
}))

jest.mock('./components/TaskAnalytics.vue', () => ({
  name: 'TaskAnalytics',
  template: '<div class="task-analytics"></div>',
}))

describe('App.vue', () => {
  let wrapper: VueWrapper
  let store: any

  beforeEach(() => {
    const pinia = createPinia()
    wrapper = mount(App, {
      global: {
        plugins: [pinia],
      },
    })
    store = useTaskStore()
  })

  afterEach(() => {
    wrapper.unmount()
  })

  test('renders Project Manager title', () => {
    expect(wrapper.text()).toContain('Project Manager')
  })

  test('renders New Task button', () => {
    const newTaskButton = wrapper.find('.button')
    expect(newTaskButton.text()).toContain('New Task')
  })

  test('opens task form when New Task button is clicked', async () => {
    const newTaskButton = wrapper.find('.button')
    await newTaskButton.trigger('click')

    const taskForm = wrapper.findComponent({ name: 'TaskForm' })
    expect(taskForm.exists()).toBe(true)
  })

  test('renders task cards based on filtered tasks', () => {
    store.filteredTasks = [
      { id: 1, title: 'Test Task 1' },
      { id: 2, title: 'Test Task 2' },
    ]

    wrapper = mount(App, {
      global: {
        plugins: [createPinia()],
      },
    })

    const taskCards = wrapper.findAllComponents({ name: 'TaskCard' })
    expect(taskCards.length).toBe(2)
  })
})
