import { Post, Comment, Tag, User } from '@prisma/client';

//TODO: zod type will be here
type CreatePostRequest = Pick<Post, 'title' | 'body' | 'userId'>;

type CommentDTO = Omit<Comment, 'userId' | 'postId'>;

type CommentAuthor = Pick<User, 'id' | 'userName'>;

type CommentWithUser = CommentDTO & {
	user: CommentAuthor;
};

type ShortPostResponse = Post & {
	tags: Tag[];
};

type FullPostResponse = Post & {
	tags: Tag[];
	comments: CommentWithUser[];
};

export type CreatePost = (data: CreatePostRequest) => Promise<Post>;

export type GetAllPosts = () => Promise<ShortPostResponse[]>;

export type GetPostById = (id: number) => Promise<FullPostResponse>;
