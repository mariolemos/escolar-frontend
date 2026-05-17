import DataTable from "@/layout/componet/DataTable";
import useExemplo from "./useExemplo";

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
                        onChange: () => console.log("Teste")
                    },
                ]}
            />
        </>
    )
}