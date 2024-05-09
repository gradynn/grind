import { z } from 'zod';

export const taskCreationSchema = z.object({
    title: z.string().min(2).max(50),
});