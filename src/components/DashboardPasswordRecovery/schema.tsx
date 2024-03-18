import { z } from "zod"

export const recoverySchema = z.object({
    senha: z.string().min(3, "O campo senha é necessário"),
    confirmPassword: z.string(),
}).refine((data) => data.senha === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
})

export type TRecoveryValues = z.infer<typeof recoverySchema>;