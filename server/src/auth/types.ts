import { Request, Response } from 'express';

import { UserDTO } from '../shared/dtos/user';
import { CreateUserRequest, LoginUserRequest } from '../shared/utils/schemas';
import { TokensPayload } from './tokens/types';

export type ProcessTokens = (
	data: UserDTO,
	fingerprint: string
) => Promise<TokensPayload>;

export type RegisterService = (
	data: CreateUserRequest,
	fingerprint: string
) => Promise<TokensPayload>;

export type LoginService = (
	data: LoginUserRequest,
	fingerprint: string
) => Promise<TokensPayload>;

export type Controller<T> = (
	req: Request<any, any, T>,
	res: Response
) => Promise<void>;
