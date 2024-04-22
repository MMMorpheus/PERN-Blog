import { Comment } from '@prisma/client';

//TODO: zod type will be here
type CreateCommentRequest = Pick<Comment, 'body' | 'userId' | 'postId'>;

export type CreateComment = (data: CreateCommentRequest) => Promise<Comment>;
