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
            { key: "id", label: "Id"},
            { key: "nome", label: "nome"},
            { key: "cpf", label: " Cpf"}
        ]}
        />        
            <h1>Responsavel</h1>            
        </>
    )
}