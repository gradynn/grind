import { NextFunction, Request, Response, Router } from "express";
import success from "../middleware/success.middleware";

const userRouter = Router();

userRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.locals.message = 'User Route';

    next();
}, success);

export default userRouter;