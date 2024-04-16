import { Request, Response, NextFunction } from 'express';

export class PostController {
	// implement sorting and quering here
	public static getAll = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {};
	public static getById = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {};
	public static getAllByTags = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {};
	public static getByUserId = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {};

	public static createOne = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {};
}
