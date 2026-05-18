import { useToast } from "@/components/Toast";
import { apiGet } from "@/services/api";
import { useEffect, useState } from "react";

const useExemplo = () => {

    const [list, setList] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { showToast } = useToast();

    useEffect(() => {
        test();
    }, []);

    const test = async () => {
        setLoading(true);
        try {
            const response = await apiGet<any[]>("/users");
            console.log(response);
            setList(response);
        } catch (error) {
            showToast("Erro ao carregar os dados!", "error");
            console.log(error)
            setList([])
        }finally {
            setLoading(false);
        }

    }
    const columns =
        [
            { key: "name", label: "Name" },
            { key: "age", label: "Age" },
            { key: "email", label: "Email" },
            { key: "address", label: "Address" },
            { key: "phone", label: "Phone" },
        ]

    return {
        action: {

        },
        data: {
            list,
            columns,
            loading
        }
    }
}

export default useExemplo;