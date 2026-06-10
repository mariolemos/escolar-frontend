import {
  alunoFormDefaultValues,
  AlunoFormSchema,
  alunoFormSchema,
} from "@/schemas/alunoschema";
import {
  colegioFormDefaultValues,
  colegioFormSchema,
} from "@/schemas/colegioSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/Toast";
import { useRouter } from "next/router";
import { apiGet, apiPost, apiPut } from "@/services/api";
import { IExemplo } from "@/pages/exemplo/useExemplo";
import { IAluno } from "../useAluno";

export const useAlunoForm = () => {
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm<AlunoFormSchema>({
    resolver: zodResolver(alunoFormSchema),
    defaultValues: alunoFormDefaultValues,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();
  const { query } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (query.id) {
      // Aqui você pode fazer uma chamada para a API para buscar os dados do exemplo com base no ID e preencher o formulário
      console.log("ID do exemplo para edição:", query.id);
      buscar(Number(query.id));
    }
  }, [query.id]);

  // Função para garantir que nascimento seja Date
  const parseNascimento = (data: AlunoFormSchema) => {
    return {
      ...data,
      nascimento: data.nascimento
        ? data.nascimento instanceof Date
          ? data.nascimento
          : new Date(data.nascimento)
        : undefined,
    };
  };

  const buscar = async (id: number) => {
    setLoading(true);
    try {
      const response = await apiGet<IAluno>(`/aluno/${id}`);
      setValue("nome", response.nome);
      setValue("nascimento", response.nascimento);
      setValue("cpf", response.cpf);
      setValue("rg", response.rg);
      setValue("turno", response.turno);
      setValue("serie", response.serie);
      setValue("turma", response.turma);
      setValue("nomePai", response.nomePai);
      setValue("nomeMae", response.nomeMae);
      setValue("convenioMedico", response.convenioMedico);
      setValue("colegioId", response.colegio);
      setValue("responsavelId", response.responsavel);
      console.log(response);
    } catch (error) {
      showToast("Erro ao carregar os dados!", "error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const salvar = async (data: AlunoFormSchema) => {
    setIsSubmitting(true);
    let response;
    try {
      if (query.id) {
        const response = await apiPut<IAluno>(`/aluno/${query.id}` , data);
      } else {
        const response = await apiPost<IAluno>("/aluno", data);
      }
      const parsedData = parseNascimento(data);
      console.log("Dados do formulário:", parsedData);
      showToast("Formulário salvo com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao salvar formulário:", error);
      showToast("Erro ao salvar formulário. Tente novamente.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    action: {
      buscar,
      salvar: handleSubmit(salvar),
    },
    data: {
      register,
      errors,
      control,
      isSubmitting,
      loading,
    },
  };
};
