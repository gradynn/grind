import { Request, Response, NextFunction } from 'express';

const success = (req: Request, res: Response, next: NextFunction) => {
    if (!res.headersSent) {
        res.status(res.statusCode || 200).json({
            success: true,
            data: res.locals.data || {}
        });
    }
}

export default success;