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
import { apiGet, apiPost, apiPut, ApiResult } from "@/services/api";
import { IExemplo } from "@/pages/exemplo/useExemplo";
import { IResponsavel } from "../useResponsavel";

export default function useFormResponsavel() {
  const {
    handleSubmit,
    register,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ResponsavelFormSchema>({
    resolver: zodResolver(responsavelFormSchema),
    defaultValues: responsavelFormDefaultValues,
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

  const buscar = async (id: number) => {
    setLoading(true);
    try {
      const response = await apiGet<IResponsavel>(`/responsavel/${id}`);
      setValue("nome", response.data.nome);
      setValue("nascimento", response.data.nascimento);
      setValue("cpf", response.data.cpf);
      setValue("rg" , response.data.rg)
      setValue("parentesco", response.data.parentesco);
      // setValue("endereco.cep", response.data.endereco.cep);
      // setValue("endereco.logradouro", response.data.endereco.logradouro);
      // setValue("endereco.numero", response.data.endereco.numero);
      // setValue("endereco.complemento", response.data.endereco.complemento);
      // setValue("endereco.bairro", response.data.endereco.bairro);
      // setValue("endereco.cidade", response.data.endereco.cidade);
      // setValue("endereco.estado", response.data.endereco.estado);
      reset({
        ...response.data,
        contatos: response.data?.contatos.map((c: Contato) => ({
          tipo: c.tipoId,
          contato: c.contato,
        })),
      });

      console.log(response);
    } catch (error) {
      showToast("Erro ao carregar os dados!", "error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const salvar = async (data: ResponsavelFormSchema) => {
    setIsSubmitting(true);
    let response;
    try {
      if (query.id) {
        const resposne = await apiPut<IResponsavel>(
          `/responsavel/${query.id}`,
          data,
        );
      } else {
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
      setValue,
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
