import { RefreshSession } from '@prisma/client';
import { UserDTO } from '../../shared/dtos/user';

export type TokensPayload = {
	accessToken: string;
	refreshToken: string;
	cookieMaxAge: number;
	user: UserDTO;
};
export type GenerateTokens = (payload: UserDTO) => TokensPayload;

export type VerifyToken = (token: string, secret: string) => UserDTO | null;

export type ProcessNewSession = (
	id: number,
	token: string,
	fingerprint: string
) => Promise<RefreshSession>;

export type DeleteSession = (
	token: string,
	fingerprint: string
) => Promise<RefreshSession | null>;
