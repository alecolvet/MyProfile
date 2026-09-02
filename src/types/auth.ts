import type {
  PublicUser,
  RegisterInput,
  UpdateProfileInput,
} from './user';

export type Session = {
  userId: string;
  createdAt: string;
};

export type Credentials = {
  username: string;
  password: string;
};

export type ValidationResult = {
  valid: boolean;
  errors: Record<string, string>;
};

export type AuthContextValue = {
  user: PublicUser | null;
  loading: boolean;
  error: string | null;
  signUp(input: RegisterInput): Promise<void>;
  signIn(credentials: Credentials): Promise<void>;
  signOut(): Promise<void>;
  updateProfile(input: UpdateProfileInput): Promise<void>;
  clearError(): void;
};