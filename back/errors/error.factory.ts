import Log from "../config/log.config";
const logger = new Log().getLogger();

class AppError extends Error {
	public statusCode: number;
	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
		logger.error(this);
	}
}

class UnauthorizedError extends AppError {
	constructor(message = "Unauthorized access") {
		super(message, 401);
	}
}

class NotFoundError extends AppError {
	constructor(message = "Resource not found") {
		super(message, 404);
	}
}

class BadRequestError extends AppError {
	constructor(message = "Bad request") {
		super(message, 400);
	}
}
class InternalServerError extends AppError {
	constructor(message = "Internal Server Error") {
		super(message, 500);
	}
}

class ErrorFactory {
	static unauthorized(message?: string) {
		return new UnauthorizedError(message);
	}

	static notFound(message?: string) {
		return new NotFoundError(message);
	}

	static badRequest(message?: string) {
		return new BadRequestError(message);
	}
	static internalServerError(message?: string) {
		return new InternalServerError(message);
	}
}

export {
	AppError,
	UnauthorizedError,
	NotFoundError,
	BadRequestError,
	InternalServerError,
	ErrorFactory,
};
