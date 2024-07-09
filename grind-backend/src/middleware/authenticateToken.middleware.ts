import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

interface CustomJwtPayload extends JwtPayload {
    userId: string;
};

/**
 * @description Middleware to authenticate and unpack a user's JWT token
 * @param req {object} - The request object
 * @param res {object} - The response object
 * @param next {function} - The next function
 * @returns 
 */
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        logger.warn('Request made with no access token');
        return res.status(401).send('Access token is missing');
    }

    jwt.verify(token, process.env.JWT_SECRET || '', (err, decoded) => {
        if (err) {
            logger.warn(`Failed to verify token: ${err.message}`);
            return res.status(403).send('Invalid token');
        }

        const payload = decoded as CustomJwtPayload;
        if (!payload.userId) {
            return res.status(403).send('Invalid token');
        }

        // Add the userId to the request body for later use
        req.body.userId = payload.userId;
        next();
    });
};

export default authenticateToken;