import { z } from 'zod';

export const schema = z.object({
    id: z.number().optional(),
    name: z.string()
        .nonempty('O nome é obrigatório'),
    birthDate: z.string()
        .nonempty('A data de nascimento é obrigatória'),
    responsibleId: z.union([
        z.number({
            required_error: 'O responsável é obrigatório'
        }),
        z.string()
            .nonempty('O responsável é obrigatório')
    ]),
    gender: z.union([
        z.number({
            required_error: 'O gênero é obrigatório'
        }),
        z.string()
            .nonempty('O gênero é obrigatório')
    ]),
});
