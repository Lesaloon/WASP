import Log from '../config/log.config';
import { Request, Response, NextFunction } from 'express';
import {ErrorFactory} from '../errors/error.factory';
const logger = new Log().getLogger();


const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	logger.error(err);
	if (typeof (err) === 'string') {
		// custom application error
		res.json(ErrorFactory.internalServerError(err));
		next();
		return;
	}

	if (err.name === 'UnauthorizedError') {
		// jwt authentication error
		res.json(ErrorFactory.unauthorized(err.message));
		next();
		return;
	}

	// default to 500 server error
	res.json(ErrorFactory.internalServerError(err.message));
	next();
	return;
	
}

export default errorHandler
