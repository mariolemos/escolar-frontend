import DataTable from "@/layout/componets/DataTable"
import useAluno from "./useAluno"
import AddIcon from '@mui/icons-material/Add';

export default function Aluno() {
    const {
        action: {},
        data: {listarAluno, load}
    } = useAluno ();

    return (
        <>
        <DataTable
        loading={load}
        buttonList={[
                    {
                        nome: "novo",
                        icon: <AddIcon sx={{ marginRight: 1 }} />,
                        redirect: "/exemplo/form"
                    },                    
                ]}
        titulo="Lista de Alunos"
        data={listarAluno}
        columns={[
            { key: "id", label: "Id"},
            { key: "nome", label: "nome" },
            { key: "turno", label: "Turno"},
            { key: "turma", label: "Turma" },
            { key: "serie", label: "Série"},
            { key: "ativo", label: "Status" },
        ]}/>        
        </>
    )
}