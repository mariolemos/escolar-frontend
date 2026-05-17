import { z } from "zod";
import { isValidCPF } from "@/utils/isValidCPF";

export const exemploFormSchema = z.object({
  nome: z.string()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  nascimento: z.string()
    .min(1, "Nascimento é obrigatório")
    .refine(
      (val) => {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(val)) return false;
        const date = new Date(val);
        if (isNaN(date.getTime())) return false;
        const today = new Date();
        today.setHours(0,0,0,0);
        return date <= today;
      },
      {
        message: "Nascimento deve ser uma data válida e não pode ser maior que hoje (YYYY-MM-DD)",
      }
    ),
  cpf: z.string()
    .min(1, "CPF é obrigatório")
    .refine(isValidCPF, { message: "CPF inválido" }),
  rg: z.string()
    .min(1, "RG é obrigatório")
    .max(10, "RG deve ter no máximo 10 caracteres"),
});

export type ExemploFormSchema = z.infer<typeof exemploFormSchema>;

export const exemploFormDefaultValues: ExemploFormSchema = {
  nome: "",
  nascimento: "",
  cpf: "",
  rg: "",
};
