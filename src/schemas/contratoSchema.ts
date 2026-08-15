import { formatToCurrency, parseCurrencyToNumber } from "@/utils/formatMoeda";
import z from "zod";

export const contratoFormSchema = z
  .object({
    valorContratual: z
      .string()
      .refine((val) => {
        return formatToCurrency(val);
      })
      .transform((val) => String(parseCurrencyToNumber(val))),

    dataInicial: z
      .date()
      .optional()
      .refine((val) => val !== undefined && val !== null, {
        message: "Data inicial é obrigatória",
      })
      .refine((val) => {
        if (!val) return true;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return val <= today;
      }, {
        message: "Data inicial deve ser uma data válida e não pode ser maior que hoje",
      }),

    dataFinal: z
      .date()
      .optional()
      .refine((val) => val !== undefined && val !== null, {
        message: "Data final é obrigatória",
      }),

    responsavelId: z
      .string()
      .min(1, "Responsavel é obrigatório")
      .max(3, "Respponsavel deve ter no máximo 3 caracteres"),

    ativo: z.boolean(),
  })
  .refine((dados: any) => {
    if (!dados.dataInicial || !dados.dataFinal) return true;
    return dados.dataFinal >= dados.dataInicial;
  }, {
    message: "Data final não pode ser anterior a data inicial",
    path: ["dataFinal"],
  });

export type ContratoFormSchema = z.infer<typeof contratoFormSchema>;

export const contratoFormDefaultValues: ContratoFormSchema = {
  valorContratual: '',
  dataInicial: new Date(),
  dataFinal: new Date(),
  responsavelId: "",
  ativo: true,
};
