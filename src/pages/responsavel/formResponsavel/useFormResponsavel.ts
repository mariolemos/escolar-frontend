import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  responsavelFormDefaultValues,
  responsavelFormSchema,
  ResponsavelFormSchema,
} from "@/schemas/responsavelSchema";
import { useEffect, useState } from "react";
import { IResponsavelResponse } from '@/hooks/api/responsavel/useApiResponsavel';
import { useToast } from "@/components/Toast";
import { useRouter } from "next/router";
import { useApiResponsavel } from '@/hooks/api';
import { Contato } from "@/layout/componets/ContatosForm";

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
  const { getById, create, update } = useApiResponsavel();

  useEffect(() => {
    if (query.id) {
      console.log("ID do exemplo para edição:", query.id);
      buscar(String(query.id));
    }
  }, [query.id]);

  // Função para garantir que nascimento seja Date
  const parseNascimento = (data: ResponsavelFormSchema) => {
    return {
      ...data,
      dataNascimento: data.dataNascimento ? new Date(data.dataNascimento) : undefined
    };
  };

  const buscar = async (id: string) => {
    setLoading(true);
    try {
      const response = await getById(id);
      if (!response || !response.success || !response.data) {
        console.error('Erro ao buscar responsável', response);
        return;
      }

      reset({
        ...response.data, 
        dataNascimento: response.data.dataNascimento ? new Date(response.data.dataNascimento) : undefined,
        contatos: response.data?.contatos?.map((c: Contato) => ({
          tipo: String(c.tipoId),
          contato: c.contato,
        })) || [],
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
        response = await update(String(query.id), data);
      } else {
        response = await create(data);
      }

      // useApiResponsavel exibe toasts padronizados; aqui apenas logamos
      const parsedData = parseNascimento(data);
      console.log("Dados do formulário:", parsedData);
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
