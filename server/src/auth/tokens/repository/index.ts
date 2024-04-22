import jwt from 'jsonwebtoken';

import { config } from '../../../core/constants';
import { db } from '../../../core/db';
import { UserDTO } from '../../../shared/dtos/user';
import { ServerError } from '../../../shared/exceptions';
import type {
	GenerateTokens,
	ProcessNewSession,
	VerifyToken,
	DeleteSession,
} from '../types';

export class TokensRepository {
	public static generateTokens: GenerateTokens = (payload) => {
		const accessToken = jwt.sign({ ...payload }, config.ACCESS_SECRET, {
			expiresIn: config.ACCESS_EXPIRATION,
		});
		const refreshToken = jwt.sign({ ...payload }, config.REFRESH_SECRET, {
			expiresIn: config.REFRESH_EXPIRATION,
		});

		const days = config.REFRESH_EXPIRATION.match(/^(\d+)/);
		const cookieMaxAge = Number(days) * 24 * 60 * 60;

		return {
			accessToken,
			refreshToken,
			cookieMaxAge,
			user: payload,
		};
	};

	public static verifyToken: VerifyToken = (token, secret) => {
		const tokenPayload = jwt.verify(token, secret);

		if (tokenPayload === 'string') return null;

		return tokenPayload as UserDTO;
	};

	public static processNewSession: ProcessNewSession = async (
		id,
		token,
		fingerprint
	) => {
		try {
			return db.$transaction(async (tx) => {
				const userSessions = await tx.refreshSession.findMany({
					where: {
						userId: id,
					},
				});

				if (userSessions.length === config.MAX_SESSIONS) {
					const [oldest] = userSessions;
					await tx.refreshSession.delete({
						where: {
							token_fingerprint: {
								token: oldest.token,
								fingerprint: oldest.fingerprint,
							},
						},
					});
				}

				return await tx.refreshSession.create({
					data: {
						userId: id,
						token,
						fingerprint,
					},
				});
			});
		} catch (error: unknown) {
			throw new ServerError('Internal server error', [
				'Transaction error: unable to process new refresh session',
			]);
		}
	};

	public static findAndDeleteSession: DeleteSession = async (
		token,
		fingerprint
	) => {
		const existingSession = db.refreshSession.findUnique({
			where: {
				token_fingerprint: {
					token,
					fingerprint,
				},
			},
		});

		if (!existingSession) {
			return null;
		}

		return await db.refreshSession.delete({
			where: {
				token_fingerprint: {
					token,
					fingerprint,
				},
			},
		});
	};
}
