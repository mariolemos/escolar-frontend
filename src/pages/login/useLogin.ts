import { useToast } from "@/components/Toast";
import { loginDefaultValues, loginSchema, LoginSchema } from "@/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useLogin = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const { showToast } = useToast();

    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: loginDefaultValues,
    });

    const login = async (data: LoginSchema) => {
        try {
            setIsSubmitting(true);
            const res = await signIn("credentials", {
                redirect: false,
                cpf: data.cpf,
                senha: data.senha,
            } as any);

            if (res && (res as any).error) {
                return;
            }
            console.log(res);
            router.push("/");
        } catch (error) {
            console.log(error);
            showToast("Erro ao Logar. Tente novamente.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        action: {
            login: handleSubmit(login),
            register
        },
        data: {
            isSubmitting,
            errors,
            control
        }
    };
}