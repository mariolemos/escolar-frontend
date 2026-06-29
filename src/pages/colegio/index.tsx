import DataTable from "@/layout/componets/DataTable";
import useColegio, { IColegio } from "./useColegio";
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
            onChange: (t: IColegio) => edit(t),
          },          
          delete: {
            onChange: (t: IColegio) => del(t),
          },
        }}
      />
    </>
  );
}
