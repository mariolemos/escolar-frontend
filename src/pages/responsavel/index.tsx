import DataTable from "@/layout/componets/DataTable";
import useResponsavel from "./useResponsavel";
import AddIcon from '@mui/icons-material/Add';

export default function Responsavel() {

    const {
            action: {},
            data: {listResponsavel,
                 columns,
                loading},

        } = useResponsavel();

    return (               
        <>
        <DataTable
        buttonList={[
                    {
                        nome: "novo",
                        icon: <AddIcon sx={{ marginRight: 1 }} />,
                        redirect: "/responsavel/formResponsavel"
                    },                    
                ]}
                titulo="Lista de Responsáveis"
        data={listResponsavel}
        columns={columns}
        loading={loading}
        />                          
        </>
    )
}