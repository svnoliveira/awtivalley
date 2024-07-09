import { z } from "zod";

export const RregisterchamadosSchema = z.object({
    Local: z.string().min(3, "O campo nome é necessário"),
    passaporte: z.string().min(3, "O campo passaporte é necessário"),
    Hora: z.string().min(3, "O campo passaporte é necessário"),
   });

export type RregisterchamadosValues = z.infer<typeof RregisterchamadosSchema>;
