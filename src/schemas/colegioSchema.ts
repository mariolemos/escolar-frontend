import { z } from "zod";
import { enderecoDefaultValues, enderecoSchema } from "./enderecoSchema";
import { contatoSchema } from "./contatoSchema";

export const colegioFormSchema = z.object({
  nome: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(50, "Nme deve conter no máximo 50 caracteres"),
  horario: z
    .string()
    .min(5, "Horário deve conter no máximo 4 caracteres")
    .max(5, "Horário deve conter no máximo 4 caracteres"),
  endereco: enderecoSchema,
  contato: z.array(contatoSchema),
});

export type ColegioFormSchema = z.infer<typeof colegioFormSchema>;

export const colegioFormDefaultValues: ColegioFormSchema = {
  nome: "",
  horario: "",
  endereco: enderecoDefaultValues,
  contato: [],
};
