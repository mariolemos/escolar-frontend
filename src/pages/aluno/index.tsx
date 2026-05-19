import DataTable from "@/layout/componets/DataTable"
import useAluno from "./useAluno"

export default function Aluno() {
    const {
        action: {},
        data: {listarAluno}
    } = useAluno ();

    return (
        <>

        <DataTable
        data={listarAluno}
        columns={[
            { key: "id", label: "Id"},
            { key: "nome", label: "nome" },
            { key: "turno", label: "Turno"},
            { key: "turma", label: "Turma" },
            { key: "serie", label: "Série"},
            { key: "ativo", label: "Status" },
        ]}/>
        <h1>Aluno</h1>
        </>
    )
}