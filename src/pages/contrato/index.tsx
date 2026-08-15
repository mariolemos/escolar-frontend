import DataTable from "@/layout/componets/DataTable";
import AddIcon from "@mui/icons-material/Add";
import useContrato from "./useContrato";
import { IContratoResponse } from "@/hooks/api/contrato/useApiContrato";

export default function contrato() {

    const {
        action: { edit, status, del },
        data: {
            columns,
            listContrato,
            loading,
            showToast,        }
    } = useContrato();

    return (
        <>
        <DataTable
        columns={columns}
        data={listContrato}
        titulo="Relação de Contrato"
        loading={loading}
        buttonList={[
          {
            nome: "novo",
            icon: <AddIcon sx={{ marginRight: 1 }} />,
            redirect: "/contrato/formContrato",
          },
        ]}
        action={{
                  edit: {
                    onChange: (t: IContratoResponse) => edit(t),
                  },
                  status: {
                    onChange: (t: IContratoResponse) => status(t),
                    checked: (t: IContratoResponse) => t.ativo,
                  },
                  delete: {
                    onChange: (t: IContratoResponse) => del(t),
                  },
                }} />
        </>
    )
}