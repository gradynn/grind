import { Request, Response, NextFunction } from 'express';

/**
 * @description Middleware to send a successful response
 * @param req {object} - The request object
 * @param res {object} - The response object
 * @param next {function} - The next function
 */
const success = (req: Request, res: Response, next: NextFunction) => {
    if (!res.headersSent) {
        res.status(res.statusCode || 200).json({
            success: true,
            data: res.locals.data || {}
        });
    }
}

export default success;