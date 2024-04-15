import { z } from "zod"

export const loginSchema = z.object({
    username: z.string().min(1, "Passaporte é necessário"),
    password: z.string().min(3, "Senha é necessária"),    
})

export type TLoginValues = z.infer<typeof loginSchema>;