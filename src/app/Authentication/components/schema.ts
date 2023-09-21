import { z } from 'zod';

export const newUserSchema = z.object({
    email: z.string()
        .email({ message: "O email deve ser válido" }),
    password: z.string()
        .nonempty('Senha é obrigatória'),
    name: z.string()
        .nonempty('O nome é obrigatório')
});

export type NewUserSchemaFormData = z.infer<typeof newUserSchema>
