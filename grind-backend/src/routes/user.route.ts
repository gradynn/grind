import { NextFunction, Request, Response, Router } from "express";
import rateLimit from "express-rate-limit";

import success from "../middleware/success.middleware";
import userRegistrationSchema from "../validators/userRegistrationSchema";
import schemaValidator from "../middleware/schemaValidator.middleware";
import { registerUser, loginUser, getProfileData } from "../services/mongodb.service";
import authenticateToken from "../middleware/authenticateToken.middleware";
import userSignInSchema from "../validators/userSignInSchema";

const userRouter = Router();

userRouter.post('/register', schemaValidator(userRegistrationSchema), async (req: Request, res: Response, next: NextFunction) => {   
    const { firstName, lastName, email, password } = req.body;
    
    try {
        await registerUser(firstName, lastName, email, password);
        res.locals.message = 'User registered successfully';
        next();
    } catch (error: any) {
        if (error.code === 11000) {
            res.status(409).json({
                message: 'User with that already exists',
            });
        } else {
            res.status(500).json({
                message: 'Internal server error',
            });
        }
    }
}, success);

// rate limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many requests, please try again after 15 minutes',
})

userRouter.post('/login', limiter, schemaValidator(userSignInSchema), async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
        const token = await loginUser(email, password);
        console.log(token);
        res.locals.data = { token };
        next();
    } catch (error: any) {
        if (error.message === 'User not found') {
            res.status(404);
            res.locals.message = 'User not found';
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

userRouter.get('/profile', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body;

    try {
        const profileData = await getProfileData(userId);
        console.log(profileData);
        res.locals.data = profileData;
        next();
    } catch (error: any) {
        res.status(500).json({
            message: 'Internal server error',
        });
    }
}, success);

export default userRouter;