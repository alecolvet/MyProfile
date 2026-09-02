export const STORAGE_KEYS = {
  USERS: '@myprofile:users',
  SESSION: '@myprofile:session',
  THEME: '@myprofile:theme',
};

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];