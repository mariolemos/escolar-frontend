import DataTable from "@/layout/componets/DataTable";
import useAluno, { IAluno } from "./useAluno";
import AddIcon from "@mui/icons-material/Add";

export default function Aluno() {
  const {
    action: { del, edit, status },
    data: { listarAluno, columns, loading },
  } = useAluno();

  return (
    <>
      <DataTable
        titulo="Lista de Alunos"
        columns={columns}
        loading={loading}
        data={listarAluno}
        buttonList={[
          {
            nome: "novo",
            icon: <AddIcon sx={{ marginRight: 1 }} />,
            redirect: "/aluno/formAluno",
          },
        ]}
        action={{
          edit: {
            onChange: (t: IAluno) => edit(t),
          },
          status: {
            onChange: (t: IAluno) => status(t),
            checked: (t: IAluno) => t.ativo,
          },
          delete: {
            onChange: (t: IAluno) => del(t),
          },
        }}
      />
    </>
  );
}
