export interface User {
  id?: number;
  nombre: string;
  email: string;
  password?: string;
  role_id?: number;
  rol?: string;
}

export interface CreateUserDTO extends Omit<User, 'id' | 'password' | 'role_id'> {}
