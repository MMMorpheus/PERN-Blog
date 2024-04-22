import { User } from '@prisma/client';
import { CreateUserRequest, LoginUserRequest } from '../utils/schemas';

export class CreateUserDTO {
	fullName: string;
	userName: string;
	email: string;
	password: string;

	constructor(data: CreateUserRequest) {
		const { fullName, userName, email, password } = data;
		this.fullName = fullName;
		this.userName = userName;
		this.email = email;
		this.password = password;
	}
}

export class UserDTO {
	id: number;
	fullName: string;
	userName: string;
	email: string;

	constructor(data: User) {
		const { id, fullName, userName, email } = data;
		this.id = id;
		this.fullName = fullName;
		this.userName = userName;
		this.email = email;
	}
}
