import router from "next/router";
import { useApiColegio } from '@/hooks/api';
import type { IColegioResponse } from '@/hooks/api/colegio/useApiColegio';
import { useEffect, useState } from "react";

const useColegio = () => {
  const [listColegio, setListColegio] = useState<IColegioResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const columns = [
    { key: "id", label: "Id" },
    { key: "nome", label: "nome" },
  ];

  const { list, remove } = useApiColegio();

  useEffect(() => {
    buscarColegios();
  }, []);

  const del = (t: IColegioResponse) => {
    // chama API para deletar e atualiza estado em caso de sucesso
    (async () => {
      try {
        const res = await remove(String(t.id));
        if (res && res.success) {
          setListColegio((prev) => prev.filter((i) => i.id !== t.id));
        }
      } catch (err) {
        console.error('Erro ao deletar colégio', err);
      }
    })();
  };

  const edit = (t: IColegioResponse) => {
    console.log("edit", t);
    router.push({
      pathname: `/colegio/formColegio`,
      query: { id: t.id },
    });
  };

  const buscarColegios = async () => {
    setLoading(true);
    try {
      const res = await list();
      if (res && res.success && res.data) {
        setListColegio(res.data);
      }
    } catch (err) {
      console.error('Erro ao buscar colégios', err);
    } finally {
      setLoading(false);
    }
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
