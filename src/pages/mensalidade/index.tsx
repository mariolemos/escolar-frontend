import DataTable from "@/layout/componets/DataTable";
import AddIcon from "@mui/icons-material/Add";
import { IAlunoResponse } from "@/hooks/api/aluno/useApiAluno";
import DrawerComponet from "@/layout/componets/Drawer";
import useMensalidade from "./useMensalidade";
import { IMensalidadeResponse } from "@/hooks/api/mensalidade/useApiMensalidade";

export default function Mensalidade() {
  const {
    action: { del, edit, status },
    data: { listarMensalidade, columns, loading },
  } = useMensalidade();

  return (
    <>
      <DataTable
        resource="MENSALIDADE"
        titulo="Lista de Mensalidades"
        columns={columns}
        loading={loading}
        data={listarMensalidade}
        buttonCadastro={
          {
            nome: "novo",
            icon: <AddIcon sx={{ marginRight: 1 }} />,
            redirect: "/mensalidade/formMensalidade",
          }
        }
        action={{
          edit: {
            onChange: (t: IMensalidadeResponse) => edit(t),
          },
          status: {
            onChange: (t: IMensalidadeResponse) => status(t),
            checked: (t: IMensalidadeResponse) => t.ativo,
          },
          delete: {
            onChange: (t: IMensalidadeResponse) => del(t),
          },
        }}
      />
    </>
  );
}
