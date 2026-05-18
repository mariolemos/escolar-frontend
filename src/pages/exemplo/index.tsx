import DataTable from "@/layout/componets/DataTable";
import useExemplo from "./useExemplo";
import AddIcon from '@mui/icons-material/Add';

export default function Exemplo() {
    const {
        action: {

        },
        data: {
            list,
            columns,
            loading
        }
    } = useExemplo();

    return (
        <>
            <DataTable
                titulo="Lista de exemplo"
                columns={columns}
                data={list}
                loading={loading}
                buttonList={[
                    {
                        nome: "novo",
                        icon: <AddIcon sx={{ marginRight: 1 }} />,
                        redirect: "/exemplo/form"
                    },
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