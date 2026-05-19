import { apiGet } from "@/services/api";
import { useEffect, useState } from "react";

export const useColegio = () => {

    const [listColegio, setListCoelgio] = useState([]);

    useEffect(() => {
        buscarColegios();
    }, [])

    const buscarColegios = async () => {
       const response = await apiGet<[]>("/colegio")
       console.log(response)
       setListCoelgio(response)
    }

    return {
        action: {

        },
        data: {
            listColegio,

        }
    }
}

export default useColegio;