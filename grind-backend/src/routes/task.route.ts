import { NextFunction, Request, Response, Router } from 'express';
import rateLimit from 'express-rate-limit';

import success from '../middleware/success.middleware';
import schemaValidator from '../middleware/schemaValidator.middleware';
import { taskCreationSchema, taskUpdateSchema } from '../validators/taskSchemas';
import authenticateToken from '../middleware/authenticateToken.middleware';
import { createTask, deleteTask, upsertTaskUpdate } from '../services/mongodb.service';
import logger from '../utils/logger';

const taskRouter = Router();

/**
 * POST /task/create
 * @summary Create a new task for a user
 * @tags Task
 *
 * @param {string} request.body.title - Title for task
 * @param {string} request.body.userId - User ID
 * @return {object} 200 - Task created successfully
 * @return {object} 500 - Internal server error
 */
taskRouter.post('/create', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body;
    try {
        const newTaskId = await createTask(userId, req.body.title);
        logger.info(`Task created successfully with ID: ${newTaskId}`);
        next();
    } catch (error: any) {
        logger.error(`Failed to create task: ${error.message}`);
        res.status(500).json({
            message: 'Internal server error',
        });
    }
}, success);

/**
 * PATCH /task/update/:taskId
 * @summary Update a task for a user
 * @tags Task
 * 
 * @param {string} request.params.taskId - Task ID
 * @param {string} request.body.update - Object containing fields to update
 * @return {object} 200 - Task updated successfully
 * @return {object} 400 - Invalid request schema
 * @return {object} 500 - Internal server error
 */
taskRouter.patch('/update/:taskId', authenticateToken, schemaValidator(taskUpdateSchema), async (req: Request, res: Response, next: NextFunction) => {
    const { userId, update } = req.body;
    const taskId = req.params.taskId;
    logger.info(`Attempting to update task with id: ${taskId}`)

    try {
        const updatedTask = await upsertTaskUpdate(taskId, userId, update);
        logger.info(`Task updated successfully: ${updatedTask}`);
        next();
    } catch (error: any) {
        logger.error(`Failed to update task: ${error.message}`);
        res.status(500).json({
            message: 'Internal server error',
        });
    }
}, success);

/**
 * DELETE /task/delete/:taskId
 * @summary Delete a task for a user
 * @tags Task
 * 
 * @param {string} request.params.taskId - Task ID
 * @return {object} 200 - Task deleted successfully
 * @return {object} 500 - Internal server error
 * @return {object} 404 - Task not found
 * @return {object} 401 - Task does not belong to user
 */
taskRouter.delete('/delete/:taskId', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body;
    const taskId = req.params.taskId;

    try {
        await deleteTask(taskId, userId);
        logger.info(`Task deleted successfully: ${taskId}`);
        next();
    } catch (error: any) {
        logger.error(`Failed to delete task: ${error.message}`);
        res.status(500).json({
            message: 'Internal server error',
        });
    }
}, success);

export default taskRouter;