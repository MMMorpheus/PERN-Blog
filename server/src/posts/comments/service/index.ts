import { CommnetsRepository } from '../repository';
import { CreateComment } from '../types';

export class CommentsService {
	public static processComment: CreateComment = async (data) => {
		return await CommnetsRepository.create(data);
	};
}
