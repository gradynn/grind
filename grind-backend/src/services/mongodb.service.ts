import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from "../models/User.model";
import Task from '../models/Task.model';
import logger from '../utils/logger';

interface MongoError extends Error {
    code?: number;
};

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
    logger.info(`Logging in user with email: ${email}`);
    const user = await User.findOne({ email });

    if (!user) {
        logger.warn('User not found');
        throw new Error('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        logger.warn('Invalid password');
        throw new Error('Invalid password');
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
    logger.info('User verified successfully, returning token');

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

export const createTask = async (userId: string, title: string): Promise<string> => {
    const newTask = await Task.create({
        title,
        userId
    });

    if (!newTask) {
        throw new Error('Failed to create task');
    }

    return newTask.title;
};

export const getUserTasks = async (userId: string) => {
    const tasks = await Task.find({
        userId
    });

    const output = tasks.map(task => {
        delete task.__v;
        return task
    });
    
    return output;
};