import { z } from 'zod';

export const createUserSchema = z
	.object({
		fullName: z.string().max(256, 'Full name is too long'),
		userName: z.string().max(256, 'User name is too long'),
		email: z
			.string()
			.email('Invalid email addres')
			.max(256, 'Email is too long'),
		password: z.string().min(3, 'Password is too short'),
		passwordConfirmation: z.string(),
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		message: "Passwords don't match",
		path: ['passwordConfirmation'],
	});

export type CreateUserRequest = z.infer<typeof createUserSchema>;

export const loginUserSchema = z.object({
	email: z.string().email('Invlaid email addres').max(256, 'Email is too long'),
	password: z.string().min(3, 'Password is too short'),
});

export type LoginUserRequest = z.infer<typeof loginUserSchema>;
