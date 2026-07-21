import { useToast } from "@/components/Toast";
import { apiGet, apiPut } from "@/services/api";
import router from "next/router";
import { useEffect, useState } from "react";
import useResponsavel from "../responsavel/useResponsavel";

export interface IContrato {
  id: number;
  responsavelId: string;
  valorContratual: string;
  status: boolean;
  dataInicial: Date;
  dataFinal: Date;
  ativo: boolean;
}

const useContrato = () => {
  const [listContrato, setListContrato] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { showToast } = useToast();

  const columns = [
    { key: "id", label: "id" },
    { key: "nomeResponsavel", label: "Responsavel" },
    { key: "valorContratual", label: "Valor Contratado" },
    { key: "dataInicial", label: "Ínicio" },
    { key: "dataFinal", label: "Final" },
    { key: "ativo", label: "Status" },
  ];

  useEffect(() => {
    buscarContrato();
  }, []);

  /**
   *
   * @param t
   * Logica para ir na API fazer a ação de deletar
   */
  const del = (t: IContrato) => {
    console.log("delete", t);
  };

  const edit = (t: IContrato) => {
    console.log("edit", t);
    router.push({
      pathname: `/contrato/formContrato`,
      query: { id: t.id },
    });
  };

  /**
   * @param t
   * Logica para ir na API fazer a ação de mudar o status, no exemplo estou apenas invertendo o valor de ativo para simular a mudança de status
   */

  
  const status =  async  (t: IContrato) => { 
    const respose = await apiPut(`/contrato/inativar/${t.id}`, null)
    buscarContrato();
    console.log("status", t.id);
  };

  const buscarContrato = async () => {
    const response = await apiGet<[]>("/contrato");
    console.log("###", response);
    console.log("&&&&", response.data);    
    setListContrato(response?.data);
  };

  return {
    action: { edit, status, del },
    data: {
      listContrato,
      loading,
      showToast,
      columns,
    },
  };
};

export default useContrato;
