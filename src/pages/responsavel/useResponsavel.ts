import { useToast } from "@/components/Toast";
import { useApiResponsavel, IResponsavelResponse } from "@/hooks/api/responsavel/useApiResponsavel";
import router from "next/router";
import { useEffect, useState } from "react";

const useResponsavel = () => {
  const [listResponsavel, setListResponsavel] = useState<IResponsavelResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { showToast } = useToast();
  const {remove, list} = useApiResponsavel();
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
  const del = (t: IResponsavelResponse) => {
    (async () => {
      try {
        const res = await remove(String(t.id));
        if (res && res.success) {
          setListResponsavel((prev) => prev.filter((item) => item.id !== t.id));
          showToast('Responsável removido com sucesso', 'success');
        }
      } catch (error) {
        console.error('Erro ao deletar responsável', error);
      }
    })();
  };

  /**
   *
   * @param t
   * Logica para ir na API fazer a ação de editar
   */

  const edit = (t: IResponsavelResponse) => {
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
  const status = (t: IResponsavelResponse) => {
    
  };

  const buscarResponsaveis = async () => {
    try {
      const response = await list();
      if (response && response.success) {
        setListResponsavel(response.data || []);
      }
      return response;
    } catch (error) {
      console.error('Erro ao buscar responsáveis', error);
    }
  };

  return {
    action: {
      buscarResponsaveis,
      setListResponsavel,
      // del,
      // status,
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
