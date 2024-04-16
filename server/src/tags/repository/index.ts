import { db } from '../../core/db';
import type {
	GetAllTags,
	CreateTags,
	GetUsedTags,
	ConnectWithPost,
} from '../types';

export class TagsRepository {
	public static createMany: CreateTags = async (tittles) => {
		return await db.tag.createMany({
			data: tittles,
			skipDuplicates: true,
		});
	};

	public static getAll: GetAllTags = async () => {
		return await db.tag.findMany({
			select: {
				title: true,
			},
		});
	};

	public static getUsed: GetUsedTags = async (tittles) => {
		return await db.tag.findMany({
			where: {
				OR: tittles,
			},
		});
	};

	public static connectWithPost: ConnectWithPost = async (id, tags) => {
		await Promise.all(
			tags.map((el) => {
				db.tagsToPosts.create({
					data: {
						postId: id,
						tagId: el.id,
					},
				});
			})
		);
	};
}

// 2. **Create a new Comment and connect it to the Post:**
// ```js
// const newComment = await prisma.comment.create({
//   data: {
//     content: 'Your Comment Content',
//     post: {
//       connect: {
//         id: newPost.id,
//       },
//     },
//     // other fields...
//   },
// });
// ```
