export type UserRole = 'admin' | 'user';
export type TreatmentPreference = 'Sr.' | 'Sra.' | 'Srta.' | '';

export type User = {
  id: number;
  name: string;
  role: UserRole;
  username: string;
  email?: string;
  password?: string;
  phone?: string;
  city?: string;
  bio?: string;
  createdAt?: string;
};

export type PublicUser =
  Omit<User, 'password'>;

export type RegisterInput = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type UpdateProfileInput =
  Pick<
    User,
    | 'name'
    | 'email'
    | 'phone'
    | 'city'
    | 'bio'
  >;