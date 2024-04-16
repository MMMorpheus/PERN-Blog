import { Tag } from '@prisma/client';

type TagTitle = Omit<Tag, 'id'>;

export type GetAllTags = () => Promise<TagTitle[]>;

export type CreateTags = (tittles: TagTitle[]) => Promise<{ count: number }>;

export type GetUsedTags = (tittles: TagTitle[]) => Promise<Tag[]>;

export type ConnectWithPost = (id: number, tags: Tag[]) => Promise<void>;

export type ProcessTags = (
	postId: number,
	tittles: TagTitle[]
) => Promise<Tag[]>;
