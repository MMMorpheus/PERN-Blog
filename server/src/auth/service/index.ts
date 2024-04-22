import { CreateUserDTO, UserDTO } from '../../shared/dtos/user';
import { BadRequest } from '../../shared/exceptions';
import { TokensRepository } from '../tokens/repository';
import type { LoginService, ProcessTokens, RegisterService } from '../types';
import { UserRepository } from '../users/repository';

export class AuthService {
	private static processTokens: ProcessTokens = async (
		userData,
		fingerprint
	) => {
		const { accessToken, refreshToken, cookieMaxAge, user } =
			TokensRepository.generateTokens(userData);
		await TokensRepository.processNewSession(
			userData.id,
			refreshToken,
			fingerprint
		);
		return {
			accessToken,
			refreshToken,
			cookieMaxAge,
			user,
		};
	};

	public static register: RegisterService = async (userData, fingerprint) => {
		const user = await UserRepository.create(new CreateUserDTO(userData));

		return await this.processTokens(new UserDTO(user), fingerprint);
	};

	public static login: LoginService = async (userData, fingerprint) => {
		const { email, password } = userData;
		const user = await UserRepository.findByEmail(email);

		if (!user) {
			throw new BadRequest('Invalid credentials');
		}

		const match = await UserRepository.checkPass(password, user.passwordHash);

		if (!match) {
			throw new BadRequest('Invalid credentials');
		}

		return await this.processTokens(new UserDTO(user), fingerprint);
	};
}
