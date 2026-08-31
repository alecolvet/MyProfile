export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  city: string;
  bio: string;
  createdAt: string;
};

export type PublicUser = Omit<User, 'password'>;

export type RegisterInput = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type UpdateProfileInput = Pick<User, 'name' | 'email' | 'phone' | 'city' | 'bio'>;