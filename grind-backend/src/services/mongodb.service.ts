import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from "../models/User.model";
import Task from '../models/Task.model';
import logger from '../utils/logger';
import { TaskUpdate } from '../entities/task.entity';

/**
 * @summary Register a new user in the database
 * @param firstName {string} - User first name
 * @param lastName {string} - Optional user last name
 * @param email {string} - User email
 * @param password {string} - User password
 * @returns {object} - The newly created user
 */
export const registerUser = async (firstName: string, lastName: string, email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });
    
    return newUser;
};

/**
 * @summary Login a user if they exist in the database and the password is correct by returning a JWT token
 * @param email {string} - User email
 * @param password {string} - User password
 * @returns {string} - JWT token
 */
export const loginUser = async (email: string, password: string): Promise<string> => {
    logger.info(`Logging in user with email: ${email}.`);
    const user = await User.findOne({ email });

    if (!user) {
        logger.info(`User with email ${email} not found.`);
        throw new Error('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        logger.info('User entered incorrect password.');
        throw new Error('Invalid password');
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
    logger.info('User verified successfully, returning token.');

    return token
};

/**
 * @summary Get a user's profile data
 * @param userId {string} - User ID
 * @returns {object} - User profile data { firstName, lastName, email }
 */
export const getUserData = async (userId: string) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error('User not found');
    }

    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        // Intentionally drop password
    };
};

/**
 * @summary Create a new task for a user
 * @param userId {string} - User ID
 * @param title {string} - Task title
 * @returns 
 */
export const createTask = async (userId: string, title: string): Promise<string> => {
    const newTask = await Task.create({
        title,
        userId
    });

    if (!newTask) {
        logger.error('Failed to create task in MongoDB');
        throw new Error('Failed to create task');
    }
    logger.info('Task created successfully');

    return newTask.title;
};

/**
 * @summary Get all tasks for a user
 * @param {string} userId User ID
 * @returns {Object[]} - Array of tasks { id, title, description, dueDate, type, points, status, userId }
 */
export const getUserTasks = async (userId: string) => {
    const tasks = await Task.find({
        userId
    });

    if (!tasks) {
        throw new Error('Failed to get tasks');
    }

    const filtered = tasks.map(task => {
        return {
            id: task._id,
            title: task.title,
            description: task?.description || '',
            dueDate: task?.dueDate || '',
            type: task.type,
            points: task?.points || -1,
            status: task.status,
            userId: task.userId
        }
    });
    
    return filtered;
};

/**
 * @summary Updates a task objects values in DB
 * @param {string} taskId ID of task to update
 * @param {string} userId ID of user who owns task, used for verification purposes
 * @param {Object} update Task Object containing values to persist in DB
 * @returns {Object} object representing the updated task
 */
export const updateTask = async (taskId: string, userId: string, update: TaskUpdate) => {
    const task = await Task.findOne({ _id: taskId, userId });

    if (!task) {
        throw new Error('Task not found or does not belong to user');
    }
    
    const updatedTask = await Task.findByIdAndUpdate(taskId, update, { upsert: true, new: true });
    
    if (!updatedTask) {
        throw new Error('Failed to update task');
    }
    
    return updatedTask;
};

/**
 * @summary Deletes a task from the DB
 * @param {string} taskId ID of the task to be deleted
 * @param {string} userId ID of user who owns the task
 * @returns {Object} The deleted task object
 */
export const deleteTask = async (taskId: string, userId: string) => {
    const task = await Task.findOne({ _id: taskId, userId });

    if (!task) {
        throw new Error('Task not found or does not belong to user');
    }
    
    const deletedTask = await Task.findByIdAndDelete(taskId);
    
    if (!deletedTask) {
        throw new Error('Failed to delete task');
    }
    
    return deletedTask;
};