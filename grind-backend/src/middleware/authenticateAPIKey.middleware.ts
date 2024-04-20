import { Request, Response, NextFunction } from 'express'

const authenticateAPIKey = (req: Request, res: Response, next: NextFunction) => {
    const key = req.header('Authorization');
    if (key === process.env.API_KEY) {
        next();
    } else {
        res.status(401).send({ message: 'Access Denied: Incorrect API token' });
    }
}

export default authenticateAPIKey;