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

    const columns = [        
            { key: "id", label: "Id"},
            { key: "nome", label: "nome" },
            { key: "turno", label: "Turno"},
            { key: "turma", label: "Turma" },
            { key: "serie", label: "Série"},
            { key: "ativo", label: "Status" },        
    ]
    return {
    action: {

    },
    data: {
       listarAluno,
       load,
       columns,
        
    }}
}

export default useAluno

