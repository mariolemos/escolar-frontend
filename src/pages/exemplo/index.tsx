import DataTable from "@/layout/componet/DataTable";
import useExemplo from "./useExemplo";
import AddIcon from '@mui/icons-material/Add';

export default function Exemplo() {
    const {
        action: {

        },
        data: {
            list,
            columns
        }
    } = useExemplo();

    return (
        <>
            <DataTable
                titulo="Lista de exemplo"
                columns={columns}
                data={list}
                buttonList={[
                    {
                        nome: "novo",
                        icon: <AddIcon sx={{ marginRight: 1 }} />,
                        redirect: "/exemplo/form"
                    },
                ]}
            />
        </>
    )
}