import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

/**
 * @summary Middleware to validate incoming request bodies against a schema
 * @param schema {object} - The schema to validate the request body against
 * @returns 
 */
const schemaValidator = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            res.status(400).json({
                message: error,
            });
        }
    };
};

export default schemaValidator;