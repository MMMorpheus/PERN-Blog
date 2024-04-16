import { TagsRepository } from '../repository';
import type { ProcessTags } from '../../types';

export class TagsService {
	public static processTags: ProcessTags = async (id, tittles) => {
		const allTags = await TagsRepository.getAll();
		const allTitles = allTags.map((el) => el.title);

		const uniqueTittles = tittles.filter((el) => !allTitles.includes(el.title));

		await TagsRepository.createMany(uniqueTittles);

		const associatedToPostTags = await TagsRepository.getUsed(tittles);

		await TagsRepository.connectWithPost(id, associatedToPostTags);

		return associatedToPostTags;
	};
}

/**
 * Пользователь создает новый пост, куда добавляет 3 тега: ['js', 'ts', 'express']
 * В первом сценарии теги 'js', 'ts' уже существуют в БД.
 *  - Получить все теги из БД
 *  - Отфильтровать уникальные значения тегов, которых еще нет в БД
 *  - Записать эти значения в БД
 *  - Обратно получить записи о тегах, которые пришли с постом
 *  - Записать эти связи в таблицу отношений Теги - к - Постам
 *  - Вернуть записи о тегах, которые связаны с данным постом
 *
 */
