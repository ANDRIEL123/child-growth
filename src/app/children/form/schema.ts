import { z } from 'zod';

export const schema = z.object({
    name: z.string()
        .nonempty('O nome é obrigatório'),
    birthDate: z.string()
        .nonempty('A data de nascimento é obrigatória')
});
