import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { exemploFormSchema, exemploFormDefaultValues, ExemploFormSchema } from "../../../schemas/exemploSchema";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { apiGet } from "@/services/api";
import { useToast } from "@/components/Toast";
import { IExemplo } from "../useExemplo";


export default function useFormExempo() {
    const {
        handleSubmit,
        register,
        control,
        setValue,
        formState: { errors },
    } = useForm<ExemploFormSchema>({
        resolver: zodResolver(exemploFormSchema),
        defaultValues: exemploFormDefaultValues,
    });

    const [loading, setLoading] = useState<boolean>(false);

    const { query } = useRouter();
    const { showToast } = useToast();

    const buscar = async (id: number) => {
        setLoading(true);
        try {
            const response = await apiGet<IExemplo>(`/users/${id}`);
            setValue("nome", response.name);
            console.log(response);
        } catch (error) {
            showToast("Erro ao carregar os dados!", "error");
            console.log(error)
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        if (query.id) {
            // Aqui você pode fazer uma chamada para a API para buscar os dados do exemplo com base no ID e preencher o formulário
            console.log("ID do exemplo para edição:", query.id);
            buscar(Number(query.id));
        }
    }, [query.id]);

    const salvar = (data: ExemploFormSchema) => {
        console.log("Dados do formulário:", data);
    };

    return {
        action: {
            salvar: handleSubmit(salvar),
        },
        data: {
            register,
            errors,
            control,
            loading
        }
    }
}