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
import { useApiAluno } from '@/hooks/api';
import useResponsavel from "@/pages/responsavel/useResponsavel";
import useColegio from "@/pages/colegio/useColegio";
import { Contato } from "@/layout/componets/ContatosForm";

export const useAlunoForm = () => {
    const {
        handleSubmit,
        register,
        control,
        setValue,
        reset,
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
        action: { },
        data: { listColegio },
    } = useColegio();

    const turno = [
        { id: 1, nome: "Matutino" },
        { id: 2, nome: "Vespertino" },
        { id: 3, nome: "Noturno" },
        { id: 4, nome: "Integral" },
    ];

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { showToast } = useToast();
    const { query } = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const { getById, create, update } = useApiAluno();

    useEffect(() => {
        if (query.id) {
            console.log("ID do exemplo para edição:", query.id);
            buscar(String(query.id));
        }
    }, [query.id]);

    // Função para garantir que nascimento seja Date
    const parseNascimento = (data: AlunoFormSchema) => {
        return {
            ...data,
            dataNascimento: data.dataNascimento
                ? data.dataNascimento instanceof Date
                    ? data.dataNascimento
                    : new Date(data.dataNascimento)
                : undefined,
        };
    };

    // Formatando data para inginorar o fuso horário
    const dataFormatada = (dataBackEnd: any) => {
        const dataLocal = new Date(dataBackEnd.replace(/-/g, "/"));
        const dataExibicao = dataLocal.toLocaleDateString("pt-BR");
        return dataExibicao;
    };

    const buscar = async (id: string) => {
        setLoading(true);
        try {
            const response = await getById(id);
            if (!response || !response.success || !response.data) {
                console.error("Erro ao buscar colégio", response);
                return;
            }

            // Mapear dados do backend para o formato esperado pelo form
            const mappedContatos =
                response.data?.contatos?.map((c: Contato) => ({
                    tipo: String(c.tipoId ?? c.tipo),
                    contato: c.contato,
                })) || [];

            const dataNascimentoDate = response.data?.dataNascimento
                ? new Date(String(response.data.dataNascimento).replace(/-/g, "/"))
                : undefined;

            const formValues: AlunoFormSchema = {
                nome: response.data?.nome ?? alunoFormDefaultValues.nome,
                cpf: response.data?.cpf ?? alunoFormDefaultValues.cpf,
                rg: response.data?.rg ?? alunoFormDefaultValues.rg,
                turno: response.data?.turno ?? alunoFormDefaultValues.turno,
                serie: response.data?.serie ?? alunoFormDefaultValues.serie,
                turma: response.data?.turma ?? alunoFormDefaultValues.turma,
                nomePai: response.data?.nomePai ?? alunoFormDefaultValues.nomePai,
                nomeMae: response.data?.nomeMae ?? alunoFormDefaultValues.nomeMae,
                convenioMedico: response.data?.convenioMedico ?? alunoFormDefaultValues.convenioMedico,
                responsavelId: String(response.data?.responsavelId ?? alunoFormDefaultValues.responsavelId),
                colegioId: String(response.data?.colegioId ?? alunoFormDefaultValues.colegioId),
                endereco: {
                    ...alunoFormDefaultValues.endereco,
                    ...(response.data?.endereco ?? {}),
                },
                contatos: mappedContatos,
                dataNascimento: dataNascimentoDate ?? alunoFormDefaultValues.dataNascimento,
            };

            reset(formValues);

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
        try {
            let response;
            if (query.id) {
                response = await update(String(query.id), data);
            } else {
                response = await create(data);
            }

            const parsedData = parseNascimento(data);
            console.log("Dados do formulário:", parsedData);
            // useApiAluno já exibe toasts de sucesso/erro
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
            salvar: handleSubmit(salvar, () => console.log("Erros de validação:", errors)),
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
