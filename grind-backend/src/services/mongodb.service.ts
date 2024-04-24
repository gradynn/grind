import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from "../models/User.model";

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
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new Error('Invalid password');
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
    
    return token
};

/**
 * @summary Get a user's profile data
 * @param userId {string} - User ID
 * @returns {object} - User profile data { firstName, lastName, email }
 */
export const getProfileData = async (userId: string) => {
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