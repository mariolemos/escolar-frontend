import { useToast } from "@/components/Toast";
import { apiGet } from "@/services/api";
import { Key, Label } from "@mui/icons-material";
import router from "next/router";
import { useEffect, useState } from "react";

export interface IColegio {
  id: number;
  nome: string;
  horario: string;
  ativo: boolean;
}

const useColegio = () => {
  const [listColegio, setListColegio] = useState<any[]>([]); 
  const [loading, setLoading] = useState<boolean>(false);
  const { showToast } = useToast();
  const columns = [
    { key: "id", label: "Id" },
    { key: "nome", label: "nome" },    
  ];

  useEffect(() => {
    buscarColegios();
  }, []);

  /**
   *
   * @param t
   * Logica para ir na API fazer a ação de deletar
   */
  const del = (t: IColegio) => {
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
  const edit = (t: IColegio) => {
    console.log("edit", t);
    router.push({
      pathname: `/colegio/formColegio`,
      query: { id: t.id },
    });
  };

  /**
   * @param t
   * Logica para ir na API fazer a ação de mudar o status, no exemplo estou apenas invertendo o valor de ativo para simular a mudança de status
   */
  const status = (t: IColegio) => {
    setListColegio((prev) =>
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

  const buscarColegios = async () => {
    const response = await apiGet<[]>("/colegio");
    console.log(response);
    setListColegio(response);
  };

  return {
    action: {
      buscarColegios,
      setListColegio,
      del,      
      edit,
    },
    data: {
      listColegio,      
      columns,
      loading,
    },
  };
};

export default useColegio;
