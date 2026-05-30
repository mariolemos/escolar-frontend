import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { exemploFormSchema, exemploFormDefaultValues, ExemploFormSchema } from "../../../schemas/exemploSchema";
import { useToast } from "@/components/Toast";
import { useState } from "react";


export default function useFormExempo() {
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = useForm<ExemploFormSchema>({
        resolver: zodResolver(exemploFormSchema),
        defaultValues: exemploFormDefaultValues,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { showToast } = useToast();
    const [open, setOpen] = useState(false);


    // Função para garantir que nascimento seja Date
    const parseNascimento = (data: ExemploFormSchema) => {
        return {
            ...data,
            nascimento: data.nascimento
                ? (data.nascimento instanceof Date
                    ? data.nascimento
                    : new Date(data.nascimento))
                : undefined,
        };
    };

    const salvar = (data: ExemploFormSchema) => {
        setIsSubmitting(true);
        try {
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
            setOpen
        },
        data: {
            register,
            errors,
            control,
            isSubmitting,
            open
        }
    }
}