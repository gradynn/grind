import bcrypt from 'bcrypt';

import { registerUser, loginUser, getProfileData } from './mongodb.service';
import User from '../models/User.model';

jest.mock('../models/User.model');
jest.mock('bcrypt');

const mockBcryptHash = bcrypt.hash as jest.MockedFunction<typeof bcrypt.hash>;

describe('MongoDB Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    it('successfully registers a new user', async () => {
        const fakeUser = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            password: 'hashedPassword'
        };
        (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
        (User.create as jest.Mock).mockResolvedValue(fakeUser);

        const result = await registerUser('John', 'Doe', 'john@example.com', 'password123');

        expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
        expect(User.create).toHaveBeenCalledWith({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            password: 'hashedPassword'
        });
        expect(result).toEqual(fakeUser);
    });

    it('handles errors when MongoDB operation fails', async () => {
        (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
        (User.create as jest.Mock).mockRejectedValue(new Error('MongoDB error'));

        await expect(registerUser('John', 'Doe', 'john@example.com', 'password123'))
            .rejects.toThrow('MongoDB error');
    }); 
});