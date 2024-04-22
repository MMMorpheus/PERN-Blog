import bcrypt from 'bcrypt';

import { config } from '../../../core/constants';
import { db } from '../../../core/db';
import { Conflict } from '../../../shared/exceptions';
import type { CheckPass, CreateUser, FindUserByEmail } from '../types';

export class UserRepository {
	public static create: CreateUser = async (data) => {
		const { fullName, userName, email, password } = data;
		const existingUser = await UserRepository.findByEmail(email);

		if (existingUser) {
			throw new Conflict(`User with email - ${email} is already exists`);
		}

		const passwordHash = await bcrypt.hash(password, config.SOLTS_ROUND);

		return await db.user.create({
			data: {
				fullName,
				userName,
				email,
				passwordHash,
			},
		});
	};

	public static findByEmail: FindUserByEmail = async (email) => {
		const user = await db.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			return null;
		}

		return user;
	};

	public static checkPass: CheckPass = async (password, hash) => {
		return await bcrypt.compare(password, hash);
	};
}
