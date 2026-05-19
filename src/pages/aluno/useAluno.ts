import { apiGet } from "@/services/api";
import { useEffect, useState } from "react"

const useAluno = () => {
    const [listarAluno, setListarAluno] = useState([]);

    useEffect(() => {
        buscarAluno();        
    }, [])

    const buscarAluno = async () => {
        const response = await apiGet<[]>("/aluno")
        console.log(response)
        setListarAluno(response)
    }
    return {
    action: {

    },
    data: {
       listarAluno 
    }}
}

export default useAluno

