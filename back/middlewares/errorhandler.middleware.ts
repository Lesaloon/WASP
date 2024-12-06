import Log from '../config/log.config';
import { Request, Response, NextFunction } from 'express';

const logger = new Log().getLogger();

interface CustomError extends Error {
	message: string;
}

const errorHandler = (err: CustomError | Error, _req: Request, res: Response, _next: NextFunction) => {
	if (typeof (err) === 'string') {
		// custom application error
		logger.error(err);
		return res.status(200).json({ message: err });
	}

	if (err.name === 'UnauthorizedError') {
		// jwt authentication error
		return res.status(200).json({ message: 'Invalid Token' });
	}

	// default to 500 server error
	logger.error(err);
	return res.status(200).json(err);
}

export default errorHandler;