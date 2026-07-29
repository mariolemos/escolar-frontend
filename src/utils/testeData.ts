import { z } from 'zod';

const schemaAgendamento = z.object({
  dataInicio: z.coerce.date({
    errorMap: () => ({ message: "Data de início inválida" })
  }),
  dataFim: z.coerce.date({
    errorMap: () => ({ message: "Data de término inválida" })
  }),
})
.refine((dados) => dados.dataFim >= dados.dataInicio, {
  message: "A data de término não pode ser menor que a data de início",
  path: ['dataFim'], // Vincula o erro diretamente ao campo dataFim
});
