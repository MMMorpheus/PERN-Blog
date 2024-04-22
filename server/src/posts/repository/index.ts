import { db } from '../../core/db/index.js';
import type { CreatePost, GetAllPosts, GetPostById } from '../types.js';

export class PostRepository {
	// public static getById = async () => {};
	// public static getAllByTags = async () => {};
	// public static getByUserId = async () => {};

	// public static createOne = async () => {};

	public static create: CreatePost = async (data) => {
		return await db.post.create({
			data,
		});
	};

	// public static getAll: GetAllPosts = async () => {
	// 	return await db.post.findMany({
	// 		select: {
	// 			title: true,
	// 			body: true,
	// 		},
	// 	});
	// };

	// public static getById = async (id: number) => {
	// 	return await db.post.findUnique({
	// 		where: {
	// 			id,
	// 		},
	// 		include: {
	// 			comments: {
	// 				include: {
	// 					User: {
	// 						select: {
	// 							id: true,
	// 							userName: true,
	// 						},
	// 					},
	// 				},
	// 			},
	// 			tagsToPosts: true,
	// 		},
	// 	});
	// };
}
