import { formatToCurrency, parseCurrencyToNumber } from "@/utils/formatMoeda";
import path from "path";
import z, { refine } from "zod";

export const contratoFormSchema = z.object({
  valorContratual: z    
    .string()
    .refine(val => {return parseCurrencyToNumber(val)}),          
  dataInicial: z
    .coerce.date()
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
        message: "Nascimento deve ser uma data",
      },
    ),    
  dataFinal: z
    .coerce.date()
    .optional()
    .refine((val) => val !== undefined && val !== null, {
      message: "Nascimento é obrigatório",
    }),
    // .refine(
    //   (val) => {
    //     if (!val) return true;
    //     const today = new Date();
    //     today.setHours(0, 0, 0, 0);
    //     return val <= today;
    //   },
    //   {
    //     message:
    //       "Nascimento deve ser uma data válida e não pode ser maior que hoje",
    //   },
    // )    
  responsavelId: z
    .string()
    .min(1, "Responsavel é obrigatório")
    .max(3, "Respponsavel deve ter no máximo 3 caracteres"),
  ativo: z.boolean("true"),  
})
.refine((dados: any ) => dados.dataFinal >= dados.dataInicial, {
      message: "Data final não pode ser anterior a data inicial",
      path: ['dataFinal'],
    });

export type ContratoFormSchema = z.infer<typeof contratoFormSchema>;

export const contratoFormDefaultValues: ContratoFormSchema = {
  valorContratual: "",
  dataInicial: new Date(),
  dataFinal: new Date(),
  responsavelId: "",
  ativo: true,
};
