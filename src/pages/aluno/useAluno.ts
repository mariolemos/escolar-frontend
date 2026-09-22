import useApiAluno, { IAlunoResponse } from "@/hooks/api/aluno/useApiAluno";
import router from "next/router";
import { useEffect, useState } from "react";

const useAluno = () => {
  const [listarAluno, setListarAluno] = useState<IAlunoResponse[]>([]);
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { list, remove } = useApiAluno();

  const columns = [
    { key: "id", label: "Id" },
    { key: "nome", label: "nome" },
    { key: "turno", label: "Turno" },
    { key: "turma", label: "Turma" },
    { key: "serie", label: "Série" },
    { key: "ativo", label: "Status" },
  ];

  useEffect(() => {
    buscarAluno();
  }, []);

  /**
   *
   * @param t
   * Logica para ir na API fazer a ação de deletar
   */
  const del = (t: IAlunoResponse) => {
    console.log("delete", t);
  };

  /**
   *
   * @param t
   * Logica para ir na API fazer a ação de editar
   */
  const edit = (t: IAlunoResponse) => {
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
  const status = (t: IAlunoResponse) => {
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
  const ordenar: any = (resp: IAlunoResponse[]) => {
    return resp.sort((a, b) => a.nome.localeCompare(b.nome));
  };

  const buscarAluno = async () => {
    try {
      setLoad(true);
      const response = await list();
      console.log(response);
      if (response && response.success) {
        setListarAluno(ordenar(response.data));
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
      buscarAluno,
      setListarAluno,
    },
    data: {
      listarAluno,
      load,
      columns,
      loading,
    },
  };
};

export default useAluno;
