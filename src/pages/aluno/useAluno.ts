import { apiGet } from "@/services/api";
import { useEffect, useState } from "react"

const useAluno = () => {
    const [listarAluno, setListarAluno] = useState([]);
    const [load, setLoad] = useState(false)

    useEffect(() => {
        buscarAluno();        
    }, [])

    const buscarAluno = async () => {
        try {
            setLoad(true)
            const response = await apiGet<[]>("/aluno")
            console.log(response)
            setListarAluno(response)            
        }
        catch(e) {
            console.log(e)            
        }finally{
            setLoad(false)
        }              
    }
    return {
    action: {

    },
    data: {
       listarAluno,
       load,
        
    }}
}

export default useAluno

