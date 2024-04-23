import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from "../models/User.model";

interface MongoError extends Error {
    code?: number;
};

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