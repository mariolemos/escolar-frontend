import useApiAluno, { IAlunoResponse } from "@/hooks/api/aluno/useApiAluno";
import useApiMensalidade, { IMensalidadeResponse } from "@/hooks/api/mensalidade/useApiMensalidade";
import { Label } from "@mui/icons-material";
import router from "next/router";
import { useEffect, useState } from "react";

const useMensalidade = () => {
  const [listarMensalidade, setListarMensalidade] = useState<IMensalidadeResponse[]>([]);
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { list, remove } = useApiMensalidade();

  const columns = [
    { key: "id", label: "Id" },
    { key: "alunos", label: "Aluno" },      
    { key: "valorMensal", label: "Valor Mensal" },
    { key: "situacao", label: "Sitaução"},
    { key: "vencimento", label: "Vencimento" },    
  ];

  useEffect(() => {
    buscarMensalidade();
  }, []);

  /**
   *
   * @param t
   * Logica para ir na API fazer a ação de deletar
   */
  const del = (t: IMensalidadeResponse) => {
    console.log("delete", t);
  };

  const convertData = (dataConvert: string) => {
    const dataBrasileira = new Date(dataConvert).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    return dataBrasileira
    console.log(dataBrasileira);
  }

  /**
   *
   * @param t
   * Logica para ir na API fazer a ação de editar
   */
  const edit = (t: IMensalidadeResponse) => {
    console.log("edit", t);
    router.push({
      pathname: `/mensalidade/formMensalidade`,
      query: { id: t.id },
    });
  };

  /**
   * @param t
   * Logica para ir na API fazer a ação de mudar o status, no exemplo estou apenas invertendo o valor de ativo para simular a mudança de status
   */
  const status = (t: IMensalidadeResponse) => {
    setListarMensalidade((prev) =>
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
  const ordenar: any = (resp: IMensalidadeResponse[]) => {
    return resp.sort((a, b) => a.mes.localeCompare(b.mes));
  };

  const buscarMensalidade = async () => {
    try {
      setLoad(true);
      const response = await list();
      console.log("****" , response);
      if (response && response.success) {
        
        setListarMensalidade(response?.data.map((mensalidade: IMensalidadeResponse) => ({
          ...mensalidade,
         vencimento: convertData(mensalidade.vencimento ?? '')         
        })));        
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoad(false);
    }
  };

  return {
    action: {
      edit,
      status,
      del,
      buscarMensalidade,
      setListarMensalidade,
    },
    data: {
      listarMensalidade,
      load,
      columns,
      loading,
    },
  };
};

export default useMensalidade;
