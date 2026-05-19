import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { exemploFormSchema, exemploFormDefaultValues, ExemploFormSchema } from "../../../schemas/exemploSchema";
import { useToast } from "@/components/Toast";


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

    const { showToast } = useToast();


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
        const parsedData = parseNascimento(data);
        console.log("Dados do formulário:", parsedData);
        showToast("Formulário salvo com sucesso!", "success");
    };

    return {
        action: {
            salvar: handleSubmit(salvar),
        },
        data: {
            register,
            errors,
            control,
        }
    }
}