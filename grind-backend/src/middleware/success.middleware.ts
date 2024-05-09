import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

/**
 * @description Middleware to send a successful response
 * @param req {object} - The request object
 * @param res {object} - The response object
 * @param next {function} - The next function
 */
const success = (req: Request, res: Response, next: NextFunction) => {
    logger.info('Sending success response');
    if (!res.headersSent) {
        res.status(res.statusCode || 200).json({
            success: true,
            data: res.locals.data || {}
        });
    }
}

export default success;