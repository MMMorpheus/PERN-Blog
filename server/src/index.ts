import 'dotenv/config';

import { ExpressApp } from './core/express/index.js';

const PORT = Number(process.env.API_PORT) ?? 3001;

const app = new ExpressApp();

app.init(PORT);
