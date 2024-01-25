import { z } from "zod"

export const indicadorSchema = z.object({
    entrada: z.string().min(3, "Selecione uma data"),
    saida: z.string().min(3, "Selecione uma data"),    
})

export type TIndicadorValues = z.infer<typeof indicadorSchema>;