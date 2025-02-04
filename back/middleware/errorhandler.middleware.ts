import Log from '../config/log.config';
import { Request, Response, NextFunction } from 'express';
import {ErrorFactory} from '../errors/error.factory';
const logger = new Log().getLogger();


const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	if (typeof (err) === 'string') {
		// custom application error
		logger.error(err);
		res.json(ErrorFactory.internalServerError(err));
	}

	if (err.name === 'UnauthorizedError') {
		// jwt authentication error
		logger.error(err);
		res.json(ErrorFactory.unauthorized(err.message));
	}

	// default to 500 server error
	logger.error(err);
	res.json(ErrorFactory.internalServerError(err.message));
	
	// stop the request from going to the next middleware
}

export default errorHandler
