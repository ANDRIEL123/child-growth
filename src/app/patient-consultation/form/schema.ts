import { z } from 'zod';

export const schema = z.object({
    id: z.number().optional(),
    date: z.string()
        .nonempty('A data da consulta é obrigatória'),
    height: z.union([
        z.string()
            .nonempty("A altura é obrigatória"),
        z.number({
            required_error: 'A altura é obrigatória'
        })
    ]),
    weight: z.union([
        z.string()
            .nonempty("O peso é obrigatório"),
        z.number({
            required_error: 'O peso é obrigatório'
        })
    ]),
    cephalicPerimeter: z.union([
        z.string()
            .nonempty("O perímetro cefálico é obrigatório"),
        z.number({
            required_error: 'O perímetro cefálico é obrigatório'
        })
    ]),
    observations: z.string().optional(),
    childrenId: z.string()
});
