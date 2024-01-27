import { z } from "zod"

export const periodSchema = z.object({
    inicio: z.string().min(3, "Selecione uma data"),
    fim: z.string().min(3, "Selecione uma data"),
})

export type TPeriodValues = z.infer<typeof periodSchema>;