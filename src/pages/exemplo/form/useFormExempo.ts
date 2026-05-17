import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { exemploFormSchema, exemploFormDefaultValues, ExemploFormSchema } from "../../../schemas/exemploSchema";


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
        }
    }
}