import { Router } from 'express';

import { PostController } from '../posts/controller/index.js';

const postsRouter: Router = Router();

postsRouter.get('/', PostController.getAll);
postsRouter.get('/:id', PostController.getById);

postsRouter.post('/', PostController.createOne);

export { postsRouter };
