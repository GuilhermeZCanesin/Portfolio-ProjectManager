export interface Task {
  id?: number
  title: string
  description: string
  status: 'Pending' | 'In Progress' | 'Done'
  priority: 'Low' | 'Medium' | 'High'
  createdAt?: string
  dueDate: string
  responsible: string
}

export interface TaskFilter {
  status: string
  priority: string
  sortBy: string
}
