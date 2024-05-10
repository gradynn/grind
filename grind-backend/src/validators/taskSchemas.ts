import { z } from 'zod';

export const taskCreationSchema = z.object({
    title: z.string().min(2).max(50),
});

export const taskUpdateSchema = z.object({
    update: z.object({
        title: z.string().min(2).max(50).optional(),
        description: z.string().min(2).max(200).optional(),
        dueDate: z.date().optional(),
        type: z.enum(['STORY', 'TASK']).optional(),
        points: z.number().int().optional(),
        status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).optional(),
    }),
});