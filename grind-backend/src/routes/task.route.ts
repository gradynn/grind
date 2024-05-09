import { NextFunction, Request, Response, Router } from 'express';
import rateLimit from 'express-rate-limit';

import success from '../middleware/success.middleware';
import schemaValidator from '../middleware/schemaValidator.middleware';
import { taskCreationSchema } from '../validators/taskSchemas';
import authenticateToken from '../middleware/authenticateToken.middleware';
import { createTask } from '../services/mongodb.service';

const taskRouter = Router();

taskRouter.post('/create', authenticateToken, schemaValidator(taskCreationSchema), async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body;

    try {
        const newTaskId = await createTask(userId, req.body.title);
        next();
    } catch (error: any) {
        res.status(500).json({
            message: 'Internal server error',
        });
    }
}, success);

export default taskRouter;