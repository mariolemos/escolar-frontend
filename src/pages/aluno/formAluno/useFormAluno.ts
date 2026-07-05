import {
  alunoFormDefaultValues,
  AlunoFormSchema,
  alunoFormSchema,
} from "@/schemas/alunoschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/Toast";
import { useRouter } from "next/router";
import { apiGet, apiPost, apiPut } from "@/services/api";
import { IAluno } from "../useAluno";
import useResponsavel from "@/pages/responsavel/useResponsavel";
import useColegio from "@/pages/colegio/useColegio";

export const useAlunoForm = () => {
  const {
    handleSubmit,
    register,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AlunoFormSchema>({
    resolver: zodResolver(alunoFormSchema),
    defaultValues: alunoFormDefaultValues,    
  });
  
  const {
      action: { },
      data: { listResponsavel },
    } = useResponsavel();
  
    const {
      action: {},
      data: { listColegio },
    } = useColegio();
  

  const turno = [
    {
      id: 1,
      nome: "Matutino",
    },
    {
      id: 2,
      nome: "Vespertino",
    },
    {
      id: 3,
      nome: "Noturno",
    },
    {
      id: 4,
      nome: "Integral",
    },
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();
  const { query } = useRouter();
  const [ loading, setLoading] = useState<boolean>(false);  

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
      nascimento: data.dataNascimento
        ? data.dataNascimento instanceof Date
          ? data.dataNascimento
          : new Date(data.dataNascimento)
        : undefined,
    };
  };

  const buscar = async (id: number) => {
    setLoading(true);
    try {
      const response = await apiGet<IAluno>(`/aluno/${id}`);
      setValue("nome", response.data.nome);
      setValue("dataNascimento", response.data.dataNascimento);
      setValue("cpf", response.data.cpf);
      setValue("rg", response.data.rg);
      setValue("turno", response.data.turno);
      setValue("serie", response.data.serie);
      setValue("turma", response.data.turma);
      setValue("nomePai", response.data.nomePai);
      setValue("nomeMae", response.data.nomeMae);
      setValue("convenioMedico", response.data.convenioMedico);
      setValue("colegioId", response.data.colegioId);
      setValue("responsavelId", response.data.responsavelId);
      console.log(watch("dataNascimento"));
      console.log(response.data);
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
      watch,
      setValue,
    },
    data: {
      register,
      errors,
      control,
      isSubmitting,
      loading,
      turno,
      listResponsavel,
      listColegio,
    },
  };
};
