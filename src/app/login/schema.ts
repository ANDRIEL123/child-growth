import { z } from 'zod';

export const userSchema = z.object({
    email: z.string()
        .email({ message: "O email deve ser válido" }),
    password: z.string()
        .nonempty('Senha é obrigatória')
});

export type UserSchemaFormData = z.infer<typeof userSchema>
