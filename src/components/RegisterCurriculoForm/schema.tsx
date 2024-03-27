import { z } from "zod";

export const registerCurriculoSchema = z.object({
    nome: z.string().min(3, "O campo nome é necessário"),
    passaporte: z.string().min(3, "O campo passaporte é necessário"),
    telefone: z.string().min(6, "O campo de telefone é necessário"),
    experiencia: z.string().min(3, "O campo experiência é necessário, e precisa de pelo menos 3 caracteres"),
    disponibilidadeEntrevista: z.string().min(3, "O campo disponibilidade para entrevista é necessário, e precisa de pelo menos 3 caracteres"),
    disponibilidadeTrabalho: z.string().min(3, "O campo disponibilidade para trabalho é necessário, e precisa de pelo menos 3 caracteres"),
    imagem: z.string().url().optional() // Tipando imagem como uma string que representa uma URL, tornando-a opcional
});

export type TRegisterCurriculoValues = z.infer<typeof registerCurriculoSchema>;
