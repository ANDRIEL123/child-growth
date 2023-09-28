import { z } from 'zod';

export const userSchema = z.object({
    id: z.number().optional(),
    email: z.string()
        .email({ message: "O email deve ser válido" }),
    password: z.string()
        .nonempty('Senha é obrigatória'),
    confirmPassword: z.string()
        .nonempty('A confirmação da senha é obrigatória'),
    name: z.string()
        .nonempty('O nome é obrigatório'),
    phone: z.string()
        .optional()
        .nullable(),
    avatar: z.union([z.string().optional(), z.object({
        FileList: z.object({
            File: z.object({
                name: z.string(),
                lastModified: z.number(),
                lastModifiedDate: z.date(),
                webkitRelativePath: z.string(),
                size: z.number(),
                type: z.string()
            }).optional()
        }).optional()
    }).optional()])
})

export type UserSchemaFormData = z.infer<typeof userSchema>
