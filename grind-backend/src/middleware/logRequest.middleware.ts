import { Request, Response, NextFunction } from 'express';

import logger from '../utils/logger';

/**
 * @summary Middleware to log incoming requests in a consistent format
 * @param req {object} - The request object
 * @param res {object} - The response object
 * @param next {function} - The next function
 */
const logRequest = (req: Request, res: Response, next: NextFunction) => {
    const method = req.method;
    const path = req.path;

    logger.info(`Received ${method} request for ${path}`);

    next();
}

export default logRequest;