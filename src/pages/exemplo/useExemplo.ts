import { apiGet } from "@/services/api";
import { useEffect, useState } from "react";

const useExemplo = () => {

    const [list, setList] = useState<any[]>([]);

    useEffect(() => {
        test();
    }, []);

    const test = async () => {

        try {
            const response = await apiGet<any[]>("/users");
            console.log(response);
            setList(response);
        } catch (error) {
            console.log(error)
            setList([])
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
            columns
        }
    }
}

export default useExemplo;