import { apiGet } from "@/services/api";
import { Key, Label } from "@mui/icons-material";
import { useEffect, useState } from "react";

 const useColegio = () => {

    const [listColegio, setListCoelgio] = useState([]);
    const [buscarColegio, setBuscrColegio] = useState([]);
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        buscarColegios();
    }, [])

    useEffect(() => {
        buscarColegioPorId();
    })

    const buscarColegios = async () => {
       const response = await apiGet<[]>("/colegio")
       console.log(response)
       setListCoelgio(response)
    }

    const buscarColegioPorId = async () => {                     
        const response = await apiGet<[]>("/colegio")
        console.log(response)
        setBuscrColegio(response)
    }

    const columns = [   

          { key: "nome", label: "nome" },
          { key: "horario", label: "horario" },          
    ]

    return {
        action: {
            buscarColegioPorId,
            buscarColegios,
        },
        data: {
            listColegio,
            buscarColegio,
            columns,
            loading
        }
    }
}

export default useColegio;