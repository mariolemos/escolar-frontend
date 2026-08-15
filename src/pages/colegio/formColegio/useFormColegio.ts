import {
  colegioFormDefaultValues,
  colegioFormSchema,
  ColegioFormSchema,
} from "@/schemas/colegioSchema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/Toast";
import { useRouter } from "next/router";
import { useApiColegio } from '@/hooks/api';
import { formatHorario } from "@/utils/format";
import { Contato } from "@/layout/componets/ContatosForm";

export default function useFormColegio() {
  const {
    handleSubmit,
    register,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ColegioFormSchema>({
    resolver: zodResolver(colegioFormSchema),
    defaultValues: colegioFormDefaultValues,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const { query } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { getById, create, update } = useApiColegio();

  useEffect(() => {
    if (query.id) {
      // Aqui você pode fazer uma chamada para a API para buscar os dados do exemplo com base no ID e preencher o formulário
      console.log("ID do exemplo para edição:", query.id);
      buscar(String(query.id));
    }
  }, [query.id]);


  const buscar = async (id: string) => {
    setLoading(true);
    try {
      const response = await getById(id);
      if (!response || !response.success || !response.data) {
        console.error('Erro ao buscar colégio', response);
        return;
      }

      reset({
        ...response.data,
        contatos: response.data?.contatos?.map((c: Contato) => ({
          tipo: String(c.tipoId),
          contato: c.contato,
        })) || [],
      });

      console.log('+++++', response);
    } catch (error) {
      showToast("Erro ao carregar os dados!", "error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const salvar = async (data: ColegioFormSchema) => {
    setIsSubmitting(true);
    console.log("ggg" , data)
    let response;
    try {
      const request = {
        ...data,
        horario: formatHorario(data.horario),
      };
      if (query.id) {
        response = await update(String(query.id), request);
      } else {
        response = await create(request);
      }

      // useApiColegio já exibe toasts de sucesso/erro padronizados
    } catch (error) {
      console.error("Erro ao salvar formulário:", error);
      showToast("Erro ao salvar formulário. Tente novamente.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    action: {
      salvar: handleSubmit(salvar, () => console.log('Erros de validação:"', errors)),           
      setOpen,
      setValue,
    },

    data: {
      register,
      errors,
      control,
      loading,
      isSubmitting,
      open,
    },
  };
}
