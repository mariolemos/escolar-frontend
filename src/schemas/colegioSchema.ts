import { z } from "zod";

export const colegioFormSchema = z.object({
    nome: z.string()
        .min(1, "Nome é obrigatório")
        .max(50, "Nme deve conter no máximo 50 caracteres"),
    horario: z.string()     
    .min(5, "Horário deve conter no máximo 4 caracteres")
    .max(5, "Horário deve conter no máximo 4 caracteres") 
})

export type ColegioFormSchema = z.infer<typeof colegioFormSchema>;

export const colegioFormDefaultValues: ColegioFormSchema = {
  nome: "",
  horario: "",
};