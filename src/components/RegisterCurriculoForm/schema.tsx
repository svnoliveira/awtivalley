import { z } from "zod"

export const registerCurriculoSchema = z.object({
    nome: z.string().min(3, "O campo nome é necessário"),
    passaporte: z.string().min(3, "O campo passaporte é necessário"),
    telefone: z.string().min(6, "O campo de telefone é necessário"),
    experiencia: z.string().min(3, "O campo senha é necessário, e precisa de pelomenos 3 caracteres"),
    disponibilidadeEntrevista: z.string().min(3, "O campo senha é necessário, e precisa de pelomenos 3 caracteres"),
    disponibilidadeTrabalho: z.string().min(3, "O campo senha é necessário, e precisa de pelomenos 3 caracteres"),
    imagem: z.string(),

})

export type TRegisterCurriculoValues = z.infer<typeof registerCurriculoSchema>;