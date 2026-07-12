import { isValidCPF } from "@/utils/isValidCPF";
import z from "zod";
import { enderecoDefaultValues, enderecoSchema } from "./enderecoSchema";
import { contatoSchema } from "./contatoSchema";

export const responsavelFormSchema = z.object({
  nome: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(50, "Nome deve conter no máximo 50 caracteres"),
  nascimento: z
    .date()
    .optional()
    .refine((val) => val !== undefined && val !== null, {
      message: "Nascimento é obrigatório",
    })
    .refine(
      (val) => {
        if (!val) return true;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return val <= today;
      },
      {
        message:
          "Nascimento deve ser uma data válida e não pode ser maior que hoje",
      },
    ),
  cpf: z
    .string()
    .min(1, "CPF é obrigatório")
    .refine(isValidCPF, { message: "CPF inválido" }),
  rg: z
    .string()
    .min(1, "RG é obrigatório")
    .max(10, "RG deve ter no máximo 10 caracteres"),
  parentesco: z
    .string()
    .min(1, "Parentesco deve ser Informado")
    .max(20, "Parentesco deve conter no máximo 20 caracteres"),
  endereco: enderecoSchema,
  contatos: z.array(contatoSchema),
});

export type ResponsavelFormSchema = z.infer<typeof responsavelFormSchema>;

export const responsavelFormDefaultValues: ResponsavelFormSchema = {
  nome: "",
  // nascimento: "",
  cpf: "",
  parentesco: "",
  rg: "",
  endereco: enderecoDefaultValues,
    contatos: [],
};
