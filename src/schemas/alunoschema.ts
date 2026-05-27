import { isValidCPF } from "@/utils/isValidCPF";
import z from "zod";

export const alunoFormSchema = z.object({
      nome: z.string()
        .min(1, "Nome é obrigatório")
        .max(50, "Nome deve ter no máximo 100 caracteres"),
      nascimento: z.date().optional()
        .refine((val) => val !== undefined && val !== null, {
          message: "Nascimento é obrigatório",
        })
        .refine(
          (val) => {
            if (!val) return true;
            const today = new Date();
            today.setHours(0,0,0,0);
            return val <= today;
          },
          {
            message: "Nascimento deve ser uma data válida e não pode ser maior que hoje",
          }
        ),
          cpf: z.string()
            .min(1, "CPF é obrigatório")
            .refine(isValidCPF, { message: "CPF inválido" }),
          rg: z.string()
            .min(1, "RG é obrigatório")
            .max(10, "RG deve ter no máximo 10 caracteres"),
          turno: z.string()
            .min(1, "Turno deve ser informado")
            .max(15, "Turno deve ter no máximo 15 caracteres"),
          serie: z.string()
            .min(1, "Série deve ser informado")
            .max(15, "Série deve ter no máximo 15 caracteres"),
          turma: z.string()
            .min(1, "Turma deve ser informado")
            .max(15, "Turma deve ter no máximo 15 caracteres"),
          nomePai: z.string()
            .min(1, "Nome é obrigatório")
            .max(100, "Nome deve ter no máximo 100 caracteres"),
          nomeMae: z.string()
            .min(1, "Nome é obrigatório")
            .max(100, "Nome deve ter no máximo 100 caracteres"),
          convenioMedico: z.string().optional(),      
});

export type AlunoFormSchema = z.infer<typeof alunoFormSchema>;

export const alunoFormDefaultValues: AlunoFormSchema = {
    nome: "",
    cpf: "",
    rg: "",
    turno: "",
    serie: "",
    turma: "",
    nomePai: "",
    nomeMae: "",
    nascimento: new Date(),
};