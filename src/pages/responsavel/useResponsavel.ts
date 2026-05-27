import { apiGet } from "@/services/api";
import { useEffect, useState } from "react";

const useResponsavel = () => {
  const [listResponsavel, setListResponsavel] = useState([]);

  useEffect(() => {
    buscarResponsaveis();
  }, []);

  const buscarResponsaveis = async () => {
    const response = await apiGet<[]>("/responsavel");
    console.log(response);
    setListResponsavel(response);
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "nome", label: "NOME" },
    { key: "cpf", label: " CPF" },
    { key: "parentesco", label: "Parentesco" },
  ];

  return {
    action: {},
    data: {
      listResponsavel,
      columns,
    },
  };
};

export default useResponsavel;
