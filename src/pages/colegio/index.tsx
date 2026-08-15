import DataTable from "@/layout/componets/DataTable";
import useColegio from "./useColegio";
import type { IColegioResponse } from '@/hooks/api/colegio/useApiColegio';
import AddIcon from "@mui/icons-material/Add";

export default function Colegio() {
  const {
    action: { edit, del},
    data: { listColegio, columns, loading },
  } = useColegio();
  return (
    <>
      <DataTable
        titulo="Lista de Colégios"
        columns={columns}
        data={listColegio}
        loading={loading}
        buttonList={[
          {
            nome: "novo",
            icon: <AddIcon sx={{ marginRight: 1 }} />,
            redirect: "/colegio/formColegio",
          },
        ]}                      
        action={{
          edit: {
            onChange: (t: IColegioResponse) => edit(t),
          },          
          delete: {
            onChange: (t: IColegioResponse) => del(t),
          },
        }}
      />
    </>
  );
}
