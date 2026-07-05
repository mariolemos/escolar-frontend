
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
import { apiGet, apiPost, apiPut } from "@/services/api";
import { IColegio } from "../useColegio";
import { formatHorario } from "@/utils/format";

export default function useFormColegio() {
  const {
    handleSubmit,
    register,
    control,
    setValue,
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

  useEffect(() => {
    if (query.id) {
      // Aqui você pode fazer uma chamada para a API para buscar os dados do exemplo com base no ID e preencher o formulário
      console.log("ID do exemplo para edição:", query.id);
      buscar(Number(query.id));
    }
  }, [query.id]);

  const buscar = async (id: number) => {
    setLoading(true);
    try {
      const response = await apiGet<IColegio>(`/colegio/${id}`);
      if (response.success) {
        setValue("nome", response.data?.nome);
        setValue("horario", response.data?.horario);
      }
      console.log(response);
    } catch (error) {
      showToast("Erro ao carregar os dados!", "error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const salvar = async (data: ColegioFormSchema) => {
    setIsSubmitting(true);
    let response;
    try {
      const request = {
        ...data,
        horario: formatHorario(data.horario),
      }
      if (query.id) {
        response = await apiPut<IColegio>(`/colegio/${query.id}`,
          request
        );
      } else {
        response = await apiPost<IColegio>("/colegio",
          request
        );
      }

      showToast("Formulário salvo com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao salvar formulário:", error);
      showToast("Erro ao salvar formulário. Tente novamente.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    action: { salvar: handleSubmit(salvar), setOpen },
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
