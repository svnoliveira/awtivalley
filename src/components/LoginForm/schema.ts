import { z } from "zod"

export const loginSchema = z.object({
    username: z.string().min(4, "Nome de Usuário é necessário"),
    password: z.string().min(5, "Senha é necessária"),    
})

export type TLoginValues = z.infer<typeof loginSchema>;