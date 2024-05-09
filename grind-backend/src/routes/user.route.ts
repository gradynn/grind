import { NextFunction, Request, Response, Router } from "express";
import rateLimit from "express-rate-limit";

import success from "../middleware/success.middleware";
import userRegistrationSchema from "../validators/userRegistrationSchema";
import schemaValidator from "../middleware/schemaValidator.middleware";
import { registerUser, loginUser, getUserData } from "../services/mongodb.service";
import authenticateToken from "../middleware/authenticateToken.middleware";
import userSignInSchema from "../validators/userSignInSchema";
import logger from "../utils/logger";
import { profile } from "console";

const userRouter = Router();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many requests, please try again after 15 minutes',
})

/**
 * POST /user/register
 * @summary Register a new user
 * @tags User
 * @param {string} request.body.firstName - User first name
 * @param {string} request.body.lastName - Optional user last name
 * @param {string} request.body.email - User email
 * @param {string} request.body.password - User password
 * @return {object} 200 - User registered successfully
 * @return {object} 409 - User with that email already exists
 * @return {object} 500 - Internal server error
 */
userRouter.post('/register', limiter, schemaValidator(userRegistrationSchema), async (req: Request, res: Response, next: NextFunction) => {   
    const { firstName, lastName, email, password } = req.body;
    
    try {
        await registerUser(firstName, lastName, email, password);
        res.locals.message = 'User registered successfully';
        next();
    } catch (error: any) {
        if (error.code === 11000) {
            res.status(409).json({
                message: 'User with that email already exists',
            });
        } else {
            res.status(500).json({
                message: 'Internal server error',
            });
        }
    }
}, success);

/**
 * POST /user/login
 * @summary Login a user
 * @tags User
 * @param {string} request.body.email - User email
 * @param {string} request.body.password - User password
 * @return {object} 200 - User logged in successfully
 * @return {object} 404 - User not found
 * @return {object} 401 - Invalid password
 * @return {object} 500 - Internal server error
 */
userRouter.post('/login', limiter, schemaValidator(userSignInSchema), async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
        const token = await loginUser(email, password);
        res.locals.data = { token };
        next();
    } catch (error: any) {
        if (error.message === 'User not found') {
            res.status(404).json({
                message: 'User not found',
            });
        } else if (error.message === 'Invalid password') {
            res.status(401).json({
                message: 'Invalid password',
            });
        } else {
            res.status(500).json({
                message: 'Internal server error',
            });
        }
    }
}, success);

/**
 * GET /user/profile
 * @summary Get user profile data
 * @tags User
 * 
 * @return {object} 200 - User profile data
 * @return {object} 500 - Internal server error
 */
userRouter.get('/user-data', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body;

    try {
        const profileData = await getUserData(userId);
        res.locals.data = { user: profileData };
        next();
    } catch (error: any) {
        res.status(500).json({
            message: 'Internal server error',
        });
    }
}, success);

export default userRouter;