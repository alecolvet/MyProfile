import AsyncStorage from '@react-native-async-storage/async-storage';

import type { StorageKey } from '../constants/storage';

export async function getItem<T>(key: StorageKey): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw === null ? null : (JSON.parse(raw) as T);
  } catch (error) {
    console.error(`[storageService] falha ao ler "${key}"`, error);
    return null;
  }
}

export async function setItem<T>(key: StorageKey, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`[storageService] falha ao gravar "${key}"`, error);
    throw new Error('Não foi possível salvar os dados no dispositivo.');
  }
}

export async function removeItem(key: StorageKey): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`[storageService] falha ao remover "${key}"`, error);
    throw new Error('Não foi possível remover os dados do dispositivo.');
  }
}