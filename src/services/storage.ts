import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, TreatmentPreference } from '../types/user';
import { Task } from '../types/task';

const KEYS = {
  SESSION: '@taskflow:session',
  TASKS: '@taskflow:tasks',
  THEME: '@taskflow:theme',
  TREATMENT: '@taskflow:treatment',
};

export const storageService = {
  async saveSession(user: User): Promise<void> {
    await AsyncStorage.setItem(KEYS.SESSION, JSON.stringify(user));
  },
  async getSession(): Promise<User | null> {
    const data = await AsyncStorage.getItem(KEYS.SESSION);
    return data ? (JSON.parse(data) as User) : null;
  },
  async clearSession(): Promise<void> {
    await AsyncStorage.removeItem(KEYS.SESSION);
  },

  async saveTasks(tasks: Task[]): Promise<void> {
    await AsyncStorage.setItem(KEYS.TASKS, JSON.stringify(tasks));
  },
  async getTasks(): Promise<Task[]> {
    const data = await AsyncStorage.getItem(KEYS.TASKS);
    return data ? (JSON.parse(data) as Task[]) : [];
  },

  async saveTheme(isDark: boolean): Promise<void> {
    await AsyncStorage.setItem(KEYS.THEME, JSON.stringify(isDark));
  },
  async getTheme(): Promise<boolean | null> {
    const data = await AsyncStorage.getItem(KEYS.THEME);
    return data !== null ? (JSON.parse(data) as boolean) : null;
  },

  async saveTreatment(userId: number, treatment: TreatmentPreference): Promise<void> {
    await AsyncStorage.setItem(`${KEYS.TREATMENT}_${userId}`, treatment);
  },
  async getTreatment(userId: number): Promise<TreatmentPreference> {
    const data = await AsyncStorage.getItem(`${KEYS.TREATMENT}_${userId}`);
    return (data as TreatmentPreference) || '';
  },
};