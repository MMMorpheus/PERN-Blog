import { db } from '../../core/db';
import type { CreateComment } from '../types';

export class CommnetsRepository {
	public static create: CreateComment = async (data) => {
		return await db.comment.create({
			data,
		});
	};
}
