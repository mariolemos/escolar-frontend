import { useToast } from "@/components/Toast";
import {
  contratoFormDefaultValues,
  contratoFormSchema,
  ContratoFormSchema,
} from "@/schemas/contratoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useResponsavel from "@/pages/responsavel/useResponsavel";
import { IContrato } from "../useContrato";
import { apiGet, apiPost, apiPut } from "@/services/api";

export default function useFormContrato() {
  const {
    handleSubmit,
    register,
    control,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<ContratoFormSchema>({
    resolver: zodResolver(contratoFormSchema),
    defaultValues: contratoFormDefaultValues,
    mode:"onChange",
    reValidateMode:"onChange"
  });

  const {
    action: {},
    data: { listResponsavel },
  } = useResponsavel();

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

   // Função para garantir que Data Inicial seja Date
    const parseDataInicial = (data: ContratoFormSchema) => {
      return {
        ...data,
        dataInicial: data.dataInicial
          ? data.dataInicial instanceof Date
            ? data.dataInicial
            : new Date(data.dataInicial)
          : undefined,
      };
    };
    // Função para garantir que Data Final seja Date
    const parseDataFinal = (data: ContratoFormSchema) => {
      return {
        ...data,
        dataFinal: data.dataFinal
          ? data.dataFinal instanceof Date
            ? data.dataFinal
            : new Date(data.dataFinal)
          : undefined,
      };
    };

     const buscar = async (id: number) => {
        setLoading(true);
        try {
          const response = await apiGet<IContrato>(`/contrato/${id}`);
          setValue("valorContratual", response.data.valorContratual);
          setValue("dataInicial", response.data.dataInicial);
          setValue("dataFinal", response.data.dataFinal);
          setValue("responsavelId", response.data.responsavelId); 
          setValue("ativo", response.data.ativo);
          console.log(response);
          reset ({
            ...response.data
          })
        } catch (error) {
          showToast("Erro ao carregar os dados!", "error");
          console.log(error);
        } finally {
          setLoading(false);
        }
    
      };

      const salvar = async (data: ContratoFormSchema) => {
          setIsSubmitting(true);
          let response;
          try {
            if (query.id) {
              const response = await apiPut<IContrato>(`/contrato/${query.id}` , data);
            } else {
              const response = await apiPost<IContrato>("/contrato", data);              
            }
            const parsedDataInicial = parseDataInicial(data);
            
            const parsedDataFinal = parseDataFinal(data);
            console.log("Dados do formulário:", parsedDataInicial, parseDataFinal);            
            showToast("Formulário salvo com sucesso!", "success");
          } catch (error) {
            console.error("Erro ao salvar formulário:", error);
            showToast("Erro ao salvar formulário. Tente novamente.", "error");
          } finally {
            setIsSubmitting(false);
          }
        };

  return {
    action: { setOpen, watch, buscar, salvar: handleSubmit(salvar) },
    data: {
      register,
      errors,
      control,
      open,
      isSubmitting,
      loading,
      listResponsavel,
    },
  };
}
