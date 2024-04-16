import http from 'node:http';
import express, { Application, RequestHandler, Router } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

export class ExpressApp {
	private _app: Application;

	constructor() {
		this._app = express();
		this._app.use(express.json());
		this._app.use(express.urlencoded({ extended: true }));
		this._app.use(express.static('/uploads'));
		this._app.use(
			cors({
				credentials: true,
			})
		);
		this._app.use(cookieParser());
	}

	init(port: number): void {
		http.createServer(this._app).listen(port, () => {
			console.log('Server started on ' + port);
		});
	}

	applyMiddleware(middleware: RequestHandler): void {
		this._app.use(middleware);
	}

	applyRouter(path: string, router: Router): void {
		this._app.use(path, router);
	}
}
