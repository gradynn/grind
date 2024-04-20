import { NextFunction, Router, Request, Response } from 'express';

import success from '../middleware/success.middleware';

const indexRouter = Router();

indexRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.locals.message = 'Grind Backend Server is up and running!';

    next();
}, success);

export default indexRouter;