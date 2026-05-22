import { apiGet } from "@/services/api";
import { useEffect, useState } from "react";

 const useColegio = () => {

    const [listColegio, setListCoelgio] = useState([]);
    const [buscarColegio, setBuscrColegio] = useState([])

    useEffect(() => {
        buscarColegios();
    }, [])

    const buscarColegios = async () => {
       const response = await apiGet<[]>("/colegio")
       console.log(response)
       setListCoelgio(response)
    }

    const buscarColegioPorId = async () => {
        const response = await apiGet<[]>('/colegio/id')
        console.log(response)
        setBuscrColegio(response)
    }

    return {
        action: {
            buscarColegioPorId,
            buscarColegios,
        },
        data: {
            listColegio,
            buscarColegio,
        }
    }
}

export default useColegio;