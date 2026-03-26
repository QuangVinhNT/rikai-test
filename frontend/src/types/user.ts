type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  fullName: string;
  isLocked: boolean;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export enum Role {
  ADMIN = 'ADMIN', 
  USER = 'USER'
}

export type {
  User
}
