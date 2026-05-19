import DataTable from "@/layout/componets/DataTable";
import useResponsavel from "./useResponsavel";


export default function Responsavel() {

    const {
            action: {},
            data: {listResponsavel},
        } = useResponsavel();

    return (               
        <>
        <DataTable
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