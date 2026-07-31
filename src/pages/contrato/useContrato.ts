import { useToast } from "@/components/Toast";
import { apiGet, apiPut } from "@/services/api";
import router from "next/router";
import { useEffect, useState } from "react";
import useResponsavel from "../responsavel/useResponsavel";
import { formatToCurrency } from "@/utils/formatMoeda";

export interface IContrato {
  id: number;
  responsavelId: string;
  valorContratual: string;
  valorMensal: string;
  status: boolean;
  dataInicial: string;
  dataFinal: string;
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
    { key: "valorMensal", label: "Valor Mensal" },
    { key: "dataInicial", label: "Ínicio" },
    { key: "dataFinal", label: "Final" },
    { key: "ativo", label: "Status" },
  ];

  useEffect(() => {
    buscarContrato();
  }, []);

  // Converter data para o formato Brasileiro
  const convertData = (dataConvert: string) => {
    const dataBrasileira = new Date(dataConvert).toLocaleDateString('pt-BR', { timeZone: 'UTC'});
    return dataBrasileira
    console.log(dataBrasileira);
  }

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
    const response = await apiGet<IContrato[]>("/contrato");       
    setListContrato(response?.data.map((contrato: IContrato) => ({
      ...contrato,
      valorContratual: formatToCurrency(contrato.valorContratual),
      dataInicial: convertData(contrato.dataInicial),
      dataFinal: convertData(contrato.dataFinal),
      valorMensal: formatToCurrency(contrato.valorMensal)        
    })));
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

