import { Router } from 'express';

import { postsRouter } from './postsRouter.js';

const rootRouter: Router = Router();

rootRouter.use('/posts', postsRouter);

export { rootRouter };
