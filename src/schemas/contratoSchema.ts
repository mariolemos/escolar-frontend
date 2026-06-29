import z from "zod";

export const contratoFormSchema = z.object({
  valorContratual: z
    .string()
    .min(1, "Valor não pode ser vazio")
    .max(11, "Valor não poder ser maior que 11 digitos"),
  dataInicial: z
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
        message: "Nascimento deve ser uma data",
      },
    ),
  dataFinal: z
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
  responsavelId: z
    .string()
    .min(1, "Responsavel é obrigatório")
    .max(3, "Respponsavel deve ter no máximo 3 caracteres"),
  ativo: z.boolean("true"),
});

export type ContratoFormSchema = z.infer<typeof contratoFormSchema>;

export const contratoFormDefaultValues: ContratoFormSchema = {
  valorContratual: "",
  dataInicial: new Date(),
  dataFinal: new Date(),
  responsavelId: "",
  ativo: true,
};
