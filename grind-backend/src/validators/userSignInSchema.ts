import z from 'zod';

const userSignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default userSignInSchema;