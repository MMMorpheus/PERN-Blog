import 'dotenv/config';
import 'module-alias/register';

import { ExpressApp } from './core/express/index.js';
import { rootRouter } from './router/index.js';

const PORT = Number(process.env.API_PORT) ?? 3001;

const app = new ExpressApp();

app.init(PORT);
app.applyRouter('/api/v0.1', rootRouter);
