import { STORAGE_KEYS } from '../constants/storage';
import type {
  Credentials,
  Session,
  ValidationResult,
} from '../types/auth';
import type {
  PublicUser,
  RegisterInput,
  UpdateProfileInput,
  User,
} from '../types/user';
import {
  getItem,
  removeItem,
  setItem,
} from './storageService';

// --------------------
// Helpers de validação
// --------------------

export function isRequired(
  value: string | undefined,
): boolean {
  return !!value && value.trim().length > 0;
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email.trim());
}

export function isMinLength(
  value: string,
  minLength: number,
): boolean {
  return value.trim().length >= minLength;
}

export function isMatch(
  value1: string,
  value2: string,
): boolean {
  return value1 === value2;
}

// --------------------
// Helpers internos
// --------------------

function generateId(): string {
  return `${Date.now()}-${Math.floor(
    Math.random() * 1_000_000,
  )}`;
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function toPublicUser(user: User): PublicUser {
  const {
    password: _password,
    ...publicUser
  } = user;

  return publicUser;
}

async function getUsers(): Promise<User[]> {
  const users = await getItem<User[]>(
    STORAGE_KEYS.USERS,
  );

  return users ?? [];
}

async function saveUsers(
  users: User[],
): Promise<void> {
  await setItem<User[]>(
    STORAGE_KEYS.USERS,
    users,
  );
}

// --------------------
// Busca de usuários
// --------------------

export async function findUserByEmail(
  email: string,
): Promise<User | undefined> {
  const users = await getUsers();

  return users.find(
    (user) =>
      normalize(user.email) === normalize(email),
  );
}

export async function findUserByUsername(
  username: string,
): Promise<User | undefined> {
  const users = await getUsers();

  return users.find(
    (user) =>
      normalize(user.username) ===
      normalize(username),
  );
}

export async function findUserById(
  id: string,
): Promise<User | undefined> {
  const users = await getUsers();

  return users.find(
    (user) => user.id === id,
  );
}

// --------------------
// Validação do cadastro
// --------------------

export function validateRegisterInput(
  input: RegisterInput,
): ValidationResult {
  const errors: Record<string, string> = {};

  if (!isRequired(input.name)) {
    errors.name = 'Informe seu nome.';
  }

  if (!isRequired(input.username)) {
    errors.username =
      'Informe um nome de usuário.';
  }

  if (!isRequired(input.email)) {
    errors.email = 'Informe seu e-mail.';
  } else if (!isValidEmail(input.email)) {
    errors.email =
      'Informe um e-mail válido.';
  }

  if (!isRequired(input.password)) {
    errors.password = 'Informe uma senha.';
  } else if (
    !isMinLength(input.password, 6)
  ) {
    errors.password =
      'A senha deve ter pelo menos 6 caracteres.';
  }

  if (!isRequired(input.confirmPassword)) {
    errors.confirmPassword =
      'Confirme sua senha.';
  } else if (
    !isMatch(
      input.password,
      input.confirmPassword,
    )
  ) {
    errors.confirmPassword =
      'As senhas não são iguais.';
  }

  return {
    valid:
      Object.keys(errors).length === 0,
    errors,
  };
}

// --------------------
// Validação do login
// --------------------

export function validateCredentials(
  credentials: Credentials,
): ValidationResult {
  const errors: Record<string, string> = {};

  if (!isRequired(credentials.username)) {
    errors.username =
      'Informe seu nome de usuário.';
  }

  if (!isRequired(credentials.password)) {
    errors.password =
      'Informe sua senha.';
  }

  return {
    valid:
      Object.keys(errors).length === 0,
    errors,
  };
}

// --------------------
// Cadastro
// --------------------

export async function registerUser(
  input: RegisterInput,
): Promise<PublicUser> {
  const validation =
    validateRegisterInput(input);

  if (!validation.valid) {
    const firstError =
      Object.values(validation.errors)[0];

    throw new Error(
      firstError ??
        'Dados de cadastro inválidos.',
    );
  }

  const normalizedEmail =
    normalize(input.email);

  const normalizedUsername =
    normalize(input.username);

  const existingEmail =
    await findUserByEmail(normalizedEmail);

  if (existingEmail) {
    throw new Error(
      'Este e-mail já está cadastrado.',
    );
  }

  const existingUsername =
    await findUserByUsername(
      normalizedUsername,
    );

  if (existingUsername) {
    throw new Error(
      'Este nome de usuário já está em uso.',
    );
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
    createdAt:
      new Date().toISOString(),
  };

  const users = await getUsers();

  const updatedUsers = [
    ...users,
    newUser,
  ];

  await saveUsers(updatedUsers);

  return toPublicUser(newUser);
}

// --------------------
// Autenticação
// --------------------

export async function authenticateUser(
  credentials: Credentials,
): Promise<PublicUser> {
  const validation =
    validateCredentials(credentials);

  if (!validation.valid) {
    const firstError =
      Object.values(validation.errors)[0];

    throw new Error(
      firstError ??
        'Dados de login inválidos.',
    );
  }

  const identifier =
    credentials.username.trim();

  const user =
    (await findUserByUsername(identifier)) ??
    (await findUserByEmail(identifier));

  if (
    !user ||
    user.password !== credentials.password
  ) {
    throw new Error(
      'Nome de usuário ou senha incorretos.',
    );
  }

  return toPublicUser(user);
}

// --------------------
// Atualização do perfil
// --------------------

export async function updateUserProfile(
  userId: string,
  input: UpdateProfileInput,
): Promise<PublicUser> {
  if (!isRequired(input.name)) {
    throw new Error(
      'Informe seu nome.',
    );
  }

  if (!isRequired(input.email)) {
    throw new Error(
      'Informe seu e-mail.',
    );
  }

  if (!isValidEmail(input.email)) {
    throw new Error(
      'Informe um e-mail válido.',
    );
  }

  const users = await getUsers();

  const userIndex = users.findIndex(
    (user) => user.id === userId,
  );

  if (userIndex === -1) {
    throw new Error(
      'Usuário não encontrado.',
    );
  }

  const emailAlreadyUsed =
    users.some(
      (user) =>
        user.id !== userId &&
        normalize(user.email) ===
          normalize(input.email),
    );

  if (emailAlreadyUsed) {
    throw new Error(
      'Este e-mail já está sendo utilizado por outro usuário.',
    );
  }

  const currentUser =
    users[userIndex];

  const updatedUser: User = {
    ...currentUser,
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    city: input.city.trim(),
    bio: input.bio.trim(),
  };

  const updatedUsers =
    users.map((user) =>
      user.id === userId
        ? updatedUser
        : user,
    );

  await saveUsers(updatedUsers);

  return toPublicUser(updatedUser);
}

// --------------------
// Sessão
// --------------------

export async function saveSession(
  userId: string,
): Promise<void> {
  const session: Session = {
    userId,
    createdAt:
      new Date().toISOString(),
  };

  await setItem<Session>(
    STORAGE_KEYS.SESSION,
    session,
  );
}

export async function getSession():
  Promise<Session | null> {
  return getItem<Session>(
    STORAGE_KEYS.SESSION,
  );
}

export async function clearSession():
  Promise<void> {
  await removeItem(
    STORAGE_KEYS.SESSION,
  );
}

export async function restoreSessionUser():
  Promise<PublicUser | null> {
  const session =
    await getSession();

  if (!session) {
    return null;
  }

  const user =
    await findUserById(
      session.userId,
    );

  if (!user) {
    await clearSession();

    return null;
  }

  return toPublicUser(user);
}