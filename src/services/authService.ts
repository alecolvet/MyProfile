export const isRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isMinLength = (value: string, minLength: number): boolean => {
  return value.trim().length >= minLength;
};

export const isMatch = (value1: string, value2: string): boolean => {
  return value1 === value2;
};

// ---------------------------------------------------------------------
// A partir daqui: parte do Integrante 3 (Autenticação).
// Cadastro, login, sessão e edição de dados, tudo persistido via
// storageService (AsyncStorage).
// ---------------------------------------------------------------------

import { STORAGE_KEYS } from '../constants/storage';
import type { Credentials, Session, ValidationResult } from '../types/auth';
import type {
  PublicUser,
  RegisterInput,
  UpdateProfileInput,
  User,
} from '../types/user';
import { getItem, removeItem, setItem } from './storageService';

// Os usuários são salvos como uma LISTA dentro de STORAGE_KEYS.USERS, para
// permitir checar e-mail/usuário duplicados entre múltiplos cadastros.

function generateId(): string {
  return `${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`;
}

// Compara e-mail/usuário ignorando maiúsculas/minúsculas e espaços extras.
function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function toPublicUser(user: User): PublicUser {
  const { password: _password, ...publicUser } = user;
  return publicUser;
}

async function getUsers(): Promise<User[]> {
  const users = await getItem<User[]>(STORAGE_KEYS.USERS);
  return users ?? [];
}

async function saveUsers(users: User[]): Promise<void> {
  await setItem<User[]>(STORAGE_KEYS.USERS, users);
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const users = await getUsers();
  return users.find((user) => normalize(user.email) === normalize(email));
}

export async function findUserByUsername(username: string): Promise<User | undefined> {
  const users = await getUsers();
  return users.find((user) => normalize(user.username) === normalize(username));
}

export async function findUserById(id: string): Promise<User | undefined> {
  const users = await getUsers();
  return users.find((user) => user.id === id);
}

// ---- Validações de formulário (usam os helpers já existentes acima) ----

export function validateRegisterInput(input: RegisterInput): ValidationResult {
  const errors: Record<string, string> = {};

  if (!isRequired(input.name)) {
    errors.name = 'Informe seu nome.';
  }

  if (!isRequired(input.username)) {
    errors.username = 'Informe um nome de usuário.';
  }

  if (!isRequired(input.email)) {
    errors.email = 'Informe seu e-mail.';
  } else if (!isValidEmail(input.email)) {
    errors.email = 'Informe um e-mail válido.';
  }

  if (!isRequired(input.password)) {
    errors.password = 'Informe uma senha.';
  } else if (!isMinLength(input.password, 6)) {
    errors.password = 'A senha deve ter pelo menos 6 caracteres.';
  }

  if (!isRequired(input.confirmPassword)) {
    errors.confirmPassword = 'Confirme sua senha.';
  } else if (!isMatch(input.password, input.confirmPassword)) {
    errors.confirmPassword = 'As senhas não são iguais.';
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

export function validateCredentials(credentials: Credentials): ValidationResult {
  const errors: Record<string, string> = {};

  if (!isRequired(credentials.username)) {
    errors.username = 'Informe seu usuário ou e-mail.';
  }

  if (!isRequired(credentials.password)) {
    errors.password = 'Informe sua senha.';
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

// ---- Cadastro, autenticação e edição de dados ----

// Cadastra um novo usuário, impedindo e-mail e nome de usuário duplicados.
export async function registerUser(input: RegisterInput): Promise<PublicUser> {
  const validation = validateRegisterInput(input);
  if (!validation.valid) {
    throw new Error(Object.values(validation.errors)[0]);
  }

  if (await findUserByEmail(input.email)) {
    throw new Error('Este e-mail já está cadastrado.');
  }

  if (await findUserByUsername(input.username)) {
    throw new Error('Este nome de usuário já está em uso.');
  }

  const newUser: User = {
    id: generateId(),
    name: input.name.trim(),
    username: input.username.trim(),
    email: input.email.trim(),
    password: input.password,
    phone: '',
    city: '',
    bio: '',
    createdAt: new Date().toISOString(),
  };

  const users = await getUsers();
  await saveUsers([...users, newUser]);

  return toPublicUser(newUser);
}

// Autentica usando o campo "username" (aceita e-mail OU nome de usuário) + senha.
export async function authenticateUser(credentials: Credentials): Promise<PublicUser> {
  const validation = validateCredentials(credentials);
  if (!validation.valid) {
    throw new Error(Object.values(validation.errors)[0]);
  }

  const identifier = credentials.username.trim();
  const user =
    (await findUserByUsername(identifier)) ?? (await findUserByEmail(identifier));

  if (!user || user.password !== credentials.password) {
    throw new Error('Usuário/e-mail ou senha incorretos.');
  }

  return toPublicUser(user);
}

// Reaproveitável pelo formulário de edição de perfil (Integrante 2).
export async function updateUserProfile(
  userId: string,
  input: UpdateProfileInput,
): Promise<PublicUser> {
  if (!isRequired(input.name)) {
    throw new Error('O nome é obrigatório.');
  }
  if (!isRequired(input.email)) {
    throw new Error('O e-mail é obrigatório.');
  }
  if (!isValidEmail(input.email)) {
    throw new Error('Informe um e-mail válido.');
  }

  const users = await getUsers();
  const index = users.findIndex((user) => user.id === userId);

  if (index === -1) {
    throw new Error('Usuário não encontrado.');
  }

  const updatedUser: User = { ...users[index], ...input };
  const updatedUsers = [...users];
  updatedUsers[index] = updatedUser;

  await saveUsers(updatedUsers);
  return toPublicUser(updatedUser);
}

// ---- Sessão ----

export async function saveSession(userId: string): Promise<void> {
  const session: Session = { userId, createdAt: new Date().toISOString() };
  await setItem<Session>(STORAGE_KEYS.SESSION, session);
}

export async function getSession(): Promise<Session | null> {
  return getItem<Session>(STORAGE_KEYS.SESSION);
}

// Logout: remove SOMENTE a sessão. O cadastro do usuário continua salvo.
export async function clearSession(): Promise<void> {
  await removeItem(STORAGE_KEYS.SESSION);
}

// Usado na abertura do app para saber se já existe alguém logado.
export async function restoreSessionUser(): Promise<PublicUser | null> {
  const session = await getSession();
  if (!session) {
    return null;
  }

  const user = await findUserById(session.userId);
  if (!user) {
    // Sessão "órfã" (usuário não existe mais) — limpa por segurança.
    await clearSession();
    return null;
  }

  return toPublicUser(user);
}