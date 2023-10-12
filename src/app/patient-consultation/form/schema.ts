import { z } from 'zod';

export const schema = z.object({
    id: z.number().optional(),
    date: z.string()
        .nonempty('A data da consulta é obrigatória'),
    height: z.string()
        .nonempty("A altura é obrigatória"),
    weight: z.string()
        .nonempty("o peso é obrigatório"),
    cephalicPerimeter: z.string()
        .nonempty("A perímetro cefálico é obrigatório"),
    observation: z.string().optional(),
    childrenId: z.string()
});
