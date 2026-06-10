import Loading from "@/components/Loading";
import { useToast } from "@/components/Toast";
import { apiGet } from "@/services/api";
import router from "next/router";
import { useEffect, useState } from "react"

export interface IAluno {
    id: number;
    nome: string;
    nascimento: Date;
    cpf: string;
    rg: string;
    turno: string;
    serie: string;
    turma: string;
    nomePai: string;
    nomeMae: string;
    convenioMedico: string;
    ativo: boolean;
    responsavel: string;
    colegio: string;
}

const useAluno = () => {
    const [listarAluno, setListarAluno] = useState<any[]>([]);
    const [load, setLoad] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { showToast } = useToast();
    const columns = [        
            { key: "id", label: "Id"},
            { key: "nome", label: "nome" },
            { key: "turno", label: "Turno"},
            { key: "turma", label: "Turma" },
            { key: "serie", label: "Série"},
            { key: "ativo", label: "Status" },        
    ]
    
    useEffect(() => {
        buscarAluno();        
    }, [])

    
  /**
   *
   * @param t
   * Logica para ir na API fazer a ação de deletar
   */
  const del = (t: IAluno) => {
    console.log("delete", t);
  };

  /**
   *
   * @param t
   * Logica para ir na API fazer a ação de editar
   */
  // const edit = async (t: IColegio) => {
  //   const response = await apiGet<[]>('/colegio/id');
  //     console.log("edit", t)
  //     setBuscrColegio(response);
  //     router.push({
  //         pathname: `/colegio/formColegio`,
  //         query: { id: t.id }
  //     });
  // }
  const edit = (t: IAluno) => {
    console.log("edit", t);
    router.push({
      pathname: `/aluno/formAluno`,
      query: { id: t.id },
    });
  };

  /**
   * @param t
   * Logica para ir na API fazer a ação de mudar o status, no exemplo estou apenas invertendo o valor de ativo para simular a mudança de status
   */
  const status = (t: IAluno) => {
    setListarAluno((prev) =>
      prev.map((item) => {
        if (item.id === t.id) {
          return {
            ...item,
            ativo: !item.ativo,
          };
        }
        return item;
      }),
    );
    console.log("status", t);
  };

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
        edit,
        status,
        del,
        buscarAluno,
        setListarAluno,
    },
    data: {
       listarAluno,
       load,
       columns,
       loading,        
    }}
}

export default useAluno

