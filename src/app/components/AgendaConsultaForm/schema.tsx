import { z } from "zod";

export const AgendaConsultaSchema = z.object({
    nome: z.string().min(3, "O campo nome é necessário"),
    passaporte: z.string().min(3, "O campo passaporte é necessário"),
    telefone: z.string().min(6, "O campo de telefone é necessário"),
    especialista: z.string().min(3, "O campo experiência é necessário, e precisa de pelo menos 3 caracteres"),
    motivoConsulta: z.string().min(3, "O campo disponibilidade para entrevista é necessário, e precisa de pelo menos 3 caracteres"),
    disponibilidadeConsulta: z.string().min(3, "O campo disponibilidade para trabalho é necessário, e precisa de pelo menos 3 caracteres"),
});

export type AgendaConsultaValues = z.infer<typeof AgendaConsultaSchema>;
