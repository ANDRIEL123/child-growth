import { z } from 'zod';

export const schema = z.object({
    date: z.string(),
    height: z.string()
        .nonempty("A altura é obrigatória"),
    weight: z.string()
        .nonempty("o peso é obrigatório"),
    cephalicPerimeter: z.string()
        .nonempty("A perímetro cefálico é obrigatório"),
    observation: z.string().optional(),
    childrenId: z.string()
});
