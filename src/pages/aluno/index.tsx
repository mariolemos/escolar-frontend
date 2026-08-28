import DataTable from "@/layout/componets/DataTable";
import useAluno from "./useAluno";
import AddIcon from "@mui/icons-material/Add";
import { IAlunoResponse } from "@/hooks/api/aluno/useApiAluno";

export default function Aluno() {
  const {
    action: { del, edit, status },
    data: { listarAluno, columns, loading },
  } = useAluno();

  return (
    <>
      <DataTable
        resource="ALUNO"
        titulo="Lista de Alunos"
        columns={columns}
        loading={loading}
        data={listarAluno}
        buttonCadastro={
          {
            nome: "novo",
            icon: <AddIcon sx={{ marginRight: 1 }} />,
            redirect: "/aluno/formAluno",
          }
        }
        action={{
          edit: {
            onChange: (t: IAlunoResponse) => edit(t),
          },
          status: {
            onChange: (t: IAlunoResponse) => status(t),
            checked: (t: IAlunoResponse) => t.ativo,
          },
          delete: {
            onChange: (t: IAlunoResponse) => del(t),
          },
        }}
      />
    </>
  );
}
