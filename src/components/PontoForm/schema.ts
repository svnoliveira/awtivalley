import { z } from "zod"

export const pontoSchema = z.object({
    entrada: z.string().min(4, "Horário de entrada é necessário"),
    // .regex(/Data: (\d{1,2}\/\d{1,2}\/\d{4})/, "Formato incorreto, deve conter Data: dd/mm/aaaa")
    // .regex(/ENTRADA: (\d{1,2}:\d{1,2}:\d{1,2})/, "Formato incorreto, deve conter ENTRADA: HH:MM:SS"),
    saida: z.string().min(4, "Horário de saída necessário"),
    // .regex(/Data: (\d{1,2}\/\d{1,2}\/\d{4})/, "Formato incorreto, deve conter Data: dd/mm/aaaa")
    // .regex(/SAÍDA: (\d{1,2}:\d{1,2}:\d{1,2})/, "Formato incorreto, deve conter SAÍDA: HH:MM:SS"),
    justificativa: z.string().optional()
})

export type TPontoValues = z.infer<typeof pontoSchema>;