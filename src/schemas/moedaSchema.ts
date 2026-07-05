import { parseCurrencyToNumber } from "@/utils/formatMoeda";
import { z } from "zod";


export const paymentSchema = z.object({
  valor: z
    .string()
    .transform((val) => parseCurrencyToNumber(val)) // Converte para número puro
    .refine((num) => num > 0, { message: "O valor deve ser maior que zero" })
    .refine((num) => num <= 10000, { message: "Limite máximo de R$ 10.000,00" }),
});
