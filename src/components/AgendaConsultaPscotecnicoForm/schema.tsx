import { z } from "zod";

export const AgendaConsultaPsicotenicoSchema = z.object({
    nome: z.string().min(3, "O campo nome é necessário"),
    passaporte: z.string().min(3, "O campo passaporte é necessário"),
    telefone: z.string().min(6, "O campo de telefone é necessário"),
    disponibilidadeConsulta: z.string().min(3, "O campo disponibilidade para trabalho é necessário, e precisa de pelo menos 3 caracteres"),
});

export type AgendaConsultaPsicotenicoValues = z.infer<typeof AgendaConsultaPsicotenicoSchema>;
