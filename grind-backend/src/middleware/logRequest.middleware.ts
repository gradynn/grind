import { Request, Response, NextFunction } from 'express';

import logger from '../utils/logger';

const logRequest = (req: Request, res: Response, next: NextFunction) => {
    const method = req.method;
    const path = req.path;
    const route = req.route ? req.route.path : 'no specific route matched';

    logger.info(`Received ${method} request for ${path} on route pattern ${route}`);

    next();
}

export default logRequest;