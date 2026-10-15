import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { Task, TaskFormData, TaskStatus } from '../types/task';
import { storageService } from '../services/storage';
import { generateId } from '../utils/generatedId';
import { AuthContext } from './AuthContext';

interface TaskContextData {
  tasks: Task[];
  isLoadingTasks: boolean;
  createTask: (data: TaskFormData) => Promise<void>;
  updateTask: (id: string, data: TaskFormData) => Promise<void>;
  toggleTaskStatus: (id: string, status: TaskStatus) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  getTaskById: (id: string) => Task | undefined;
}

export const TaskContext = createContext<TaskContextData>({} as TaskContextData);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState<boolean>(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoadingTasks(true);
        const stored = await storageService.getTasks();
        setAllTasks(stored);
      } catch {
        throw new Error('Erro ao carregar tarefas do armazenamento local.');
      } finally {
        setIsLoadingTasks(false);
      }
    };
    loadTasks();
  }, []);

  const userTasks = user ? allTasks.filter((t) => t.userId === user.id) : [];

  const createTask = async (data: TaskFormData): Promise<void> => {
    if (!user) throw new Error('Usuário não autenticado.');
    try {
      const now = new Date().toISOString();
      const newTask: Task = {
        id: generateId(),
        userId: user.id,
        title: data.title.trim(),
        description: data.description.trim(),
        status: data.status,
        priority: data.priority,
        category: data.category,
        categoryIcon: data.categoryIcon,
        createdAt: now,
        updatedAt: now,
      };
      const updated = [newTask, ...allTasks];
      await storageService.saveTasks(updated);
      setAllTasks(updated);
    } catch {
      throw new Error('Não foi possível salvar a nova tarefa.');
    }
  };

  const updateTask = async (id: string, data: TaskFormData): Promise<void> => {
    if (!user) throw new Error('Usuário não autenticado.');
    try {
      const now = new Date().toISOString();
      const updated = allTasks.map((task) =>
        task.id === id && task.userId === user.id
          ? {
              ...task,
              title: data.title.trim(),
              description: data.description.trim(),
              status: data.status,
              priority: data.priority,
              category: data.category,
              categoryIcon: data.categoryIcon,
              updatedAt: now,
            }
          : task
      );
      await storageService.saveTasks(updated);
      setAllTasks(updated);
    } catch {
      throw new Error('Falha ao atualizar a tarefa.');
    }
  };

  const toggleTaskStatus = async (id: string, status: TaskStatus): Promise<void> => {
    if (!user) throw new Error('Usuário não autenticado.');
    try {
      const now = new Date().toISOString();
      const updated = allTasks.map((task) =>
        task.id === id && task.userId === user.id
          ? { ...task, status, updatedAt: now }
          : task
      );
      await storageService.saveTasks(updated);
      setAllTasks(updated);
    } catch {
      throw new Error('Erro ao alterar status da tarefa.');
    }
  };

  const deleteTask = async (id: string): Promise<void> => {
    if (!user) throw new Error('Usuário não autenticado.');
    try {
      const updated = allTasks.filter((t) => !(t.id === id && t.userId === user.id));
      await storageService.saveTasks(updated);
      setAllTasks(updated);
    } catch {
      throw new Error('Erro ao excluir a tarefa.');
    }
  };

  const getTaskById = (id: string): Task | undefined => {
    return userTasks.find((t) => t.id === id);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: userTasks,
        isLoadingTasks,
        createTask,
        updateTask,
        toggleTaskStatus,
        deleteTask,
        getTaskById,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};