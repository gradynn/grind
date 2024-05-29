import { z } from 'zod';

export const taskCreationSchema = z.object({
    title: z.string().min(2).max(50),
});

export const taskUpdateSchema = z.object({
    update: z.object({
        title: z.string().min(2).max(50),
        description: z.string().max(200),
        dueDate: z.date().optional(),
        type: z.enum(['STORY', 'TASK']),
        points: z.number().int(),
        status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']),
    }),
});