import { zodResolver } from "@hookform/resolvers/zod";
import Responsavel from "..";
import { useForm } from "react-hook-form";
import {
  responsavelFormDefaultValues,
  responsavelFormSchema,
  ResponsavelFormSchema,
} from "@/schemas/responsavelSchema";
import { useEffect, useState } from "react";
import { ExemploFormSchema } from "@/schemas/exemploSchema";
import { useToast } from "@/components/Toast";
import { useRouter } from "next/router";
import { apiGet, apiPost, apiPut } from "@/services/api";
import { IExemplo } from "@/pages/exemplo/useExemplo";
import { IResponsavel } from "../useResponsavel";

export default function useFormResponsavel() {
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm<ResponsavelFormSchema>({
    resolver: zodResolver(responsavelFormSchema),
    defaultValues: responsavelFormDefaultValues,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();
  const { query } = useRouter();

  // Função para garantir que nascimento seja Date
  const parseNascimento = (data: ExemploFormSchema) => {
    return {
      ...data,
      nascimento: data.nascimento
        ? data.nascimento instanceof Date
          ? data.nascimento
          : new Date(data.nascimento)
        : undefined,
    };
  };

  const [loading, setLoading] = useState<boolean>(false);

  const buscar = async (id: number) => {
    setLoading(true);
    try {
      const response = await apiGet<IResponsavel>(`/responsavel/${id}`);
      setValue("nome", response.nome);
      setValue("nascimento", response.nascimento);
      setValue("cpf", response.cpf);
      setValue("rg" , response.rg)
      setValue("parentesco", response.parentesco);               
      console.log(response);
    } catch (error) {
      showToast("Erro ao carregar os dados!", "error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.id) {
      // Aqui você pode fazer uma chamada para a API para buscar os dados do exemplo com base no ID e preencher o formulário
      console.log("ID do exemplo para edição:", query.id);
      buscar(Number(query.id));
    }
  }, [query.id]);
  
  const salvar = async (data: ResponsavelFormSchema) => {
    setIsSubmitting(true);
    let response;
    try {
      if(query.id) {
        const resposne = await apiPut<IResponsavel>(`/responsavel/${query.id}`, data);
      }else {
        const resposne = await apiPost<IResponsavel>("/responsavel", data);
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
      salvar: handleSubmit(salvar),
    },
    data: {
      register,
      errors,
      control,
      loading,
      isSubmitting,
    },
  };
}
