import { isValidCPF } from "@/utils/isValidCPF";
import z from "zod";
import { enderecoDefaultValues, enderecoSchema } from "./enderecoSchema";
import { contatoSchema } from "./contatoSchema";

export const mensalidadeFormSchema = z.object({
  alunos: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(50, "Nome deve ter no máximo 100 caracteres"),
    
  turno: z
    .string()
    .min(1, "Turno deve ser informado")
    .max(15, "Turno deve ter no máximo 15 caracteres"),  
  responsavelId: z
    .string()
    .min(1, "Responsavel é obrigatório")
    .max(3, "Respponsavel deve ter no máximo 3 caracteres"),
  colegioId: z
    .string()
    .min(1, "Coelgio é obrigatório")
    .max(3, "Colegio deve ter no máximo 3 caracteres"),  
});

export type MensalidadeFormSchema = z.infer<typeof mensalidadeFormSchema>;

export const mensalidadeFormDefaultValues: MensalidadeFormSchema = {
  alunos: "",  
  turno: "",   
  responsavelId: "",
  colegioId: "",  
};
