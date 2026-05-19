import { apiGet } from "@/services/api";
import { useEffect, useState } from "react"

const useResponsavel = () => {
    

    const [listResponsavel, setListResponsavel] = useState([]);

    useEffect(() => {
        buscarResponsaveis();
    }, [] )

    const buscarResponsaveis = async () => {
        const response = await apiGet<[]>("/responsavel")
        console.log(response) 
        setListResponsavel(response)
    }

    return {
        action: {

        },
        data: {
            listResponsavel,
        }
    }
}

export default useResponsavel