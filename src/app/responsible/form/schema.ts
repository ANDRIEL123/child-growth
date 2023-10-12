import { z } from 'zod';

export const schema = z.object({
    id: z.number().optional(),
    name: z.string()
        .nonempty('O nome é obrigatório'),
    email: z.string()
        .nonempty('O email é obrigatório'),
    cpf: z.string()
        .nonempty('O CPF é obrigatório'),
    birthDate: z.string()
        .optional(),
    phone: z.string()
        .optional()
});
