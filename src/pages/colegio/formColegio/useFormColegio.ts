import Exemplo from "@/pages/exemplo";
import { colegioFormDefaultValues, colegioFormSchema, ColegioFormSchema } from "@/schemas/colegioSchema";
import { exemploFormSchema } from "@/schemas/exemploSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import FormColegio from ".";
import { useForm } from "react-hook-form";


export default  function useFormColegio() {
    const {
        handleSubmit,
    } = useForm<ColegioFormSchema>({
        resolver: zodResolver(colegioFormSchema),
        defaultValues: colegioFormDefaultValues,
    })
    
    const [isSubmitting, setIsSubmitting] = useState(false);

    return {
        action: {

        },
        data: {
            isSubmitting
        }
    }

}

;