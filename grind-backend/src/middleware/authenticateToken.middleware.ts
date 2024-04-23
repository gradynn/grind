import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface CustomJwtPayload extends JwtPayload {
    userId: string;
};

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401).send('Access token is missing');
    }

    jwt.verify(token, process.env.JWT_SECRET || '', (err, decoded) => {
        if (err) {
            return res.sendStatus(403).send('Invalid token');
        }

        const payload = decoded as CustomJwtPayload;
        if (!payload.userId) {
            return res.sendStatus(403).send('Invalid token');
        }

        req.body.userId = payload.userId;
        next();
    });
};

export default authenticateToken;