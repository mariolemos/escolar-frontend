import DataTable from "@/layout/componets/DataTable";
import useResponsavel from "./useResponsavel";
import type { IResponsavelResponse } from "@/hooks/api/responsavel/useApiResponsavel";
import AddIcon from "@mui/icons-material/Add";

export default function Responsavel() {
  const {
    action: { edit },
    data: { listResponsavel, columns, loading },
  } = useResponsavel();
  
  return (
    <>
      <DataTable
        resource="RESPONSAVEL"
        titulo="Lista de Responsáveis"
        columns={columns}
        data={listResponsavel}
        loading={loading}
        buttonCadastro={{
          nome: "novo",
          icon: <AddIcon sx={{ marginRight: 1 }} />,
          redirect: "/responsavel/formResponsavel",
        }}
        action={{
          edit: {
            onChange: (t: IResponsavelResponse) => edit(t),
          },
          // status: {
          //     onChange: (t: IResponsavelResponse) => status(t),
          //     checked: (t: IResponsavelResponse) => t.ativo,          
          // },
          // delete: { onChange: (t: IResponsavelResponse) => del(t)}
        }}
      />
    </>
  );
}
