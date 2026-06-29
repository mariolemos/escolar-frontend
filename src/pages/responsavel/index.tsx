import DataTable from "@/layout/componets/DataTable";
import useResponsavel, { IResponsavel } from "./useResponsavel";
import AddIcon from "@mui/icons-material/Add";

export default function Responsavel() {
  const {
    action: { edit},
    data: { listResponsavel, columns, loading },
  } = useResponsavel();

  return (
    <>
      <DataTable
        titulo="Lista de Responsáveis"
        columns={columns}
        data={listResponsavel}
        loading={loading}
        buttonList={[
          {
            nome: "novo",
            icon: <AddIcon sx={{ marginRight: 1 }} />,
            redirect: "/responsavel/formResponsavel",
          },
        ]}
        action={{
            edit: {
                onChange: (t: IResponsavel) => edit(t),                
            },
            // status: {
            //     onChange: (t: IResponsavel) => status(t),
            //     checked: (t: IResponsavel) => t.ativo,          
            // },
            // delete: { onChange: (t: IResponsavel) => del(t)}
        }}
      />
    </>
  );
}
