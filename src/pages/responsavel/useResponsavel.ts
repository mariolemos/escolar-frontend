import { useToast } from "@/components/Toast";
import { apiGet } from "@/services/api";
import router from "next/router";
import { useEffect, useState } from "react";
import { IColegio } from "../colegio/useColegio";

export interface IResponsavel {
  id: number;
  nome: string;
  nascimento: Date;
  cpf: string;
  parentesco: string;
  ativo: boolean;
  rg: string;
}

const useResponsavel = () => {
  const [listResponsavel, setListResponsavel] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { showToast } = useToast();
  const columns = [
    { key: "id", label: "ID" },
    { key: "nome", label: "NOME" },
    { key: "cpf", label: " CPF" },
    { key: "parentesco", label: "Parentesco" },
  ];

  useEffect(() => {
    buscarResponsaveis();
  }, []);

  /**
   *
   * @param t
   * Logica para ir na API fazer a ação de deletar
   */
  const del = (t: IResponsavel) => {
    console.log("delete", t);
  };

  /**
   *
   * @param t
   * Logica para ir na API fazer a ação de editar
   */
  // const edit = async (t: IResponsavel) => {
  //   const response = await apiGet<[]>('/responsavel/id');
  //     console.log("edit", t)
  //     setBuscarResponsavel(response);
  //     router.push({
  //         pathname: `/responsavel/formResponsavel`,
  //         query: { id: t.id }
  //     });
  // }
  const edit = (t: IResponsavel) => {
    console.log("edit", t);
    router.push({
      pathname: `/responsavel/formResponsavel`,
      query: { id: t.id },
    });
  };

  // /**
  //  * @param t
  //  * Logica para ir na API fazer a ação de mudar o status, no exemplo estou apenas invertendo o valor de ativo para simular a mudança de status
  //  */
  const status = (t: IResponsavel) => {
    setListResponsavel((prev) =>
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

  const buscarResponsaveis = async () => {
    const response = await apiGet<[]>("/responsavel");
    console.log(response);
    setListResponsavel(response);
  };

  return {
    action: {
      buscarResponsaveis,
      setListResponsavel,
      del,
      status,
      edit,
    },
    data: {
      listResponsavel,      
      columns,
      loading,
    },
  };
};

export default useResponsavel;
