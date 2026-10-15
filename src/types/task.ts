export type TaskStatus = 'pendente' | 'em_andamento' | 'concluida';
export type TaskPriority = 'baixa' | 'media' | 'alta';

export interface Task {
  id: string;
  userId: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: string;
  categoryIcon: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: string;
  categoryIcon: string;
}