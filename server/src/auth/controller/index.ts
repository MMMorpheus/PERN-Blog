import { CreateUserDTO } from '../../shared/dtos/user';
import { BadRequest } from '../../shared/exceptions';
import {
	CreateUserRequest,
	LoginUserRequest,
} from '../../shared/utils/schemas';
import { AuthService } from '../service';

import type { Controller } from '../types';

export class AuthController {
	public static register: Controller<CreateUserRequest> = async (req, res) => {
		const fingerprint = req.headers;

		if (!fingerprint) {
			throw new BadRequest("Browser's fingerprint is required");
		}

		if (typeof fingerprint === 'string') {
			const { accessToken, refreshToken, cookieMaxAge, user } =
				await AuthService.register(req.body, fingerprint);

			res.cookie('refreshToken', refreshToken, {
				httpOnly: true,
				maxAge: cookieMaxAge,
			});

			res.status(201).send({ data: user, accessToken: accessToken });
		} else {
			throw new BadRequest("Browser's fingerprint is required");
		}
	};

	public static login: Controller<LoginUserRequest> = async (req, res) => {
		const fingerprint = req.headers;

		if (!fingerprint) {
			throw new BadRequest("Browser's fingerprint is required");
		}

		if (typeof fingerprint === 'string') {
			const { accessToken, refreshToken, cookieMaxAge, user } =
				await AuthService.login(req.body, fingerprint);

			res.cookie('refreshToken', refreshToken, {
				httpOnly: true,
				maxAge: cookieMaxAge,
			});

			res.status(200).send({ data: user, accessToken: accessToken });
		} else {
			throw new BadRequest("Browser's fingerprint is required");
		}
	};
}
