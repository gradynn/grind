import { NextFunction, Router, Request, Response } from 'express';

import success from '../middleware/success.middleware';

const indexRouter = Router();

/**
 * GET /
 * @summary This is the root route that returns a message to indicate that the API is running.
 * 
 * @returns {object} 200 - An object with a message indicating that the API is running
 */
indexRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.locals.message = 'Grind API is running...';

    next();
}, success);

export default indexRouter;