import { User } from '@prisma/client';
import { CreateUserDTO } from '../../shared/dtos/user';

export type CreateUser = (data: CreateUserDTO) => Promise<User>;

export type FindUserByEmail = (email: string) => Promise<User | null>;

export type CheckPass = (password: string, hash: string) => Promise<boolean>;
