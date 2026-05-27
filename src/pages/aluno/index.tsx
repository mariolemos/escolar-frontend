import DataTable from "@/layout/componets/DataTable"
import useAluno from "./useAluno"
import AddIcon from '@mui/icons-material/Add';

export default function Aluno() {
    const {
        action: {},
        data: {listarAluno, load, columns}
    } = useAluno ();

    return (
        <>
        <DataTable
        loading={load}
        buttonList={[
                    {
                        nome: "novo",
                        icon: <AddIcon sx={{ marginRight: 1 }} />,
                        redirect: "/aluno/form"
                    },                    
                ]}
        titulo="Lista de Alunos"
        data={listarAluno}
        columns={columns}/>        
        </>
    )
}