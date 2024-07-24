import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {
  createTask,
  deleteTask,
  getUserData,
  getUserTasks,
  loginUser,
  registerUser,
  updateTask,
} from './mongodb.service';
import User from '../models/User.model';
import Task from '../models/Task.model';
import { TaskUpdate } from '../entities/task.entity';

jest.mock('bcrypt');
jest.mock('../models/User.model');
jest.mock('../models/Task.model');
jest.mock('jsonwebtoken');

describe('MongoDB Service', () => {
  describe('registerUser', () => {
    const mockUserObj = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'hashedPassword',
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should hash the password before storing', async () => {
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (User.create as jest.Mock).mockResolvedValue(mockUserObj);

      await registerUser(
        'Test',
        'User',
        'test@example.com',
        'unhashedPassword'
      );

      expect(bcrypt.hash).toHaveBeenCalledWith('unhashedPassword', 10);
      expect(User.create).toHaveBeenCalledWith(mockUserObj);
    });
  });

  describe('loginUser', () => {
    const mockUserObj = {
      _id: 123,
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'hashedPassword',
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should throw error when email is not found', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      await expect(loginUser('test@example.com', 'password')).rejects.toThrow(
        'User not found'
      );
    });

    it('should throw error when password is invalid', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(mockUserObj);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(loginUser('test@example.com', 'password')).rejects.toThrow(
        'Invalid password'
      );
    });

    it('should handle successful login', async () => {
      const mockToken = 'mockJwtToken';
      const mockEmail = 'test@example.com';
      const mockPassword = 'password';

      (User.findOne as jest.Mock).mockResolvedValue(mockUserObj);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockResolvedValue(mockToken);

      const result = await loginUser('test@example.com', 'password');

      expect(User.findOne).toHaveBeenCalledWith({ email: mockEmail });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        mockPassword,
        mockUserObj.password
      );
      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: mockUserObj._id },
        process.env.JWT_SECRET || '',
        { expiresIn: '1h' }
      );
      expect(result).toBe(mockToken);
    });
  });

  describe('getUserData', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should throw an error if user is not found', async () => {
      const mockId = '123';

      (User.findById as jest.Mock).mockResolvedValue(null);

      await expect(getUserData(mockId)).rejects.toThrow('User not found');
      expect(User.findById).toHaveBeenCalledWith(mockId);
    });

    it('should return user data without password', async () => {
      const mockUser = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'password',
      };

      (User.findById as jest.Mock).mockReturnValue(mockUser);

      const result = await getUserData('123');

      const { password, ...userWithoutPassword } = mockUser;
      expect(password).toBe(mockUser.password);
      expect(result).toEqual(userWithoutPassword);
    });
  });

  const mockTask = {
    _id: 1,
    title: 'Test Task',
    description: 'Test description.',
    dueDate: '2011-10-05T14:48:00.000Z',
    points: 10,
    status: 'TODO',
    userId: 123456,
  };

  describe('createTask', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should throw an error when task creation fails', async () => {
      (Task.create as jest.Mock).mockResolvedValue(null);

      await expect(createTask('nonexistentUser', 'New Task')).rejects.toThrow(
        'Failed to create task'
      );
    });

    it('should return task title when successful', async () => {
      const mockId = '123';

      (Task.create as jest.Mock).mockResolvedValue(mockTask);

      const result = await createTask(mockId, mockTask.title);

      expect(Task.create).toHaveBeenCalledWith({
        userId: mockId,
        title: mockTask.title,
      });
      expect(result).toBe(mockTask.title);
    });
  });

  describe('getUserTasks', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should get throw an error if it fails to find the passed task', async () => {
      (Task.find as jest.Mock).mockResolvedValue(null);

      await expect(getUserTasks('nonexistentTask')).rejects.toThrow(
        'Failed to get tasks'
      );
    });

    it('should return property constructed task', async () => {
      const mockTaskArray = [
        mockTask
      ];

      (Task.find as jest.Mock).mockResolvedValue(mockTaskArray);

      expect(await getUserTasks('1')).toEqual([
        {
          id: 1,
          title: 'Test Task',
          description: 'Test description.',
          dueDate: '2011-10-05T14:48:00.000Z',
          points: 10,
          status: 'TODO',
          userId: 123456,
        },
      ]);
    });
  });

  describe('upsertTaskUpdate', () => {
    beforeAll(() => {
      jest.clearAllMocks();
    });

    it('should throw error if no task is found', async () => {
      (Task.findOne as jest.Mock).mockResolvedValue(null);

      await expect(updateTask('1', '123', {} as TaskUpdate)).rejects.toThrow(
        'Task not found or does not belong to user'
      );
    });

    it('should throw an error if it finds the task but fails to update', async () => {
      (Task.findOne as jest.Mock).mockResolvedValue(mockTask);
      (Task.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      await expect(updateTask('1', '123', {} as TaskUpdate)).rejects.toThrow(
        'Failed to update task'
      );
    });

    it('it should return the updated task when successful', async () => {
      (Task.findOne as jest.Mock).mockResolvedValue(mockTask);
      (Task.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockTask);

      expect(await updateTask('1', '123', {} as TaskUpdate)).toEqual(mockTask);
    });
  });

  describe('deleteTask', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    it('should throw an error when the task it not found', async () => {
      (Task.findOne as jest.Mock).mockResolvedValue(null);

      await expect(deleteTask('1', '123')).rejects.toThrow(
        'Task not found or does not belong to user'
      );
    });

    it('should throw an error when the task fails to be deleted', async() => {
        (Task.findOne as jest.Mock).mockResolvedValue(mockTask);
        (Task.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

        await expect(deleteTask('1', '123')).rejects.toThrow('Failed to delete task');
    });

    it('should return the deleted task when successful', async () => {
        (Task.findOne as jest.Mock).mockResolvedValue(mockTask);
        (Task.findByIdAndDelete as jest.Mock).mockResolvedValue(mockTask);

        expect(await deleteTask('1', '123')).toEqual(mockTask);
    });
  });
});
