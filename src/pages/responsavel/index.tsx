import DataTable from "@/layout/componets/DataTable";
import useResponsavel from "./useResponsavel";
import AddIcon from '@mui/icons-material/Add';

export default function Responsavel() {

    const {
            action: {},
            data: {listResponsavel},
        } = useResponsavel();

    return (               
        <>
        <DataTable
        buttonList={[
                    {
                        nome: "novo",
                        icon: <AddIcon sx={{ marginRight: 1 }} />,
                        redirect: "/exemplo/form"
                    },                    
                ]}
                titulo="Lista de Responsáveis"
        data={listResponsavel}
        columns={[
            { key: "id", label: "ID"},
            { key: "nome", label: "NOME"},
            { key: "cpf", label: " CPF"},
            { key: "parentesco", label: "Parentesco"}
        ]}
        />                          
        </>
    )
}