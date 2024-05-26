import { z } from "zod"

export const editUserSchema = z.object({
    nome: z.string().optional(),
    ativo: z.string().optional(),
    passaporte: z.string().optional(),
    senha: z.string().optional(),
    cargo: z.string().optional(),
    discord_id: z.string().optional(),
    setor: z.string().optional(),
    efetivacao: z.string().optional(),
    funcao: z.string().optional(),
    funcoes_extra: z.string().optional(),
    ultima_promocao: z.string().optional(),
    observacoes: z.string().optional(),
    hab_aereo: z.string().optional(),
    ciclo: z.string().optional(),
    data: z.string().optional(),
    responsavel: z.string().optional(),
    crm: z.string().optional(),
})

export type TEditUserValues = z.infer<typeof editUserSchema>;