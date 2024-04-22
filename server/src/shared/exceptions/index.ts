class ApiError extends Error {
	status: number;
	errors: string[];

	constructor(code: number, message: string, errors = []) {
		super(message);
		this.status = code;
		this.errors = errors;
	}
}

export class Conflict extends ApiError {
	constructor(message: string, errors = []) {
		super(409, message, errors);
	}
}

export class BadRequest extends ApiError {
	constructor(message: string, errors = []) {
		super(400, message, errors);
	}
}

export class ServerError extends ApiError {
	constructor(message: string, errors) {
		super(500, message, errors);
	}
}
