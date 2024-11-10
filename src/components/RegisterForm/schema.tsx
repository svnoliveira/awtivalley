import { z } from "zod";

export const registerSchema = z
  .object({
    nome: z.string().min(3, "O campo nome é necessário"),
    passaporte: z.string().min(1, "O campo passaporte é necessário"),
    discord_id: z.string().min(6, "O campo ID do Discord é necessário"),
    senha: z.string().min(3, "O campo senha é necessário, e precisa de pelo menos 3 caracteres"),
    confirmPassword: z.string(),
    licenca_medica: z.object({
      crm: z.string()
        .min(1, "O campo CRM é necessário")
        .transform((val) => val.toUpperCase()), // Apenas o campo CRM será convertido para maiúsculas
    }),
  })
  .refine((data) => data.senha === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });

export type TRegisterValues = z.infer<typeof registerSchema>;
