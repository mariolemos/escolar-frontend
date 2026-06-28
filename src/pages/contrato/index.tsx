import DataTable from "@/layout/componets/DataTable";
import useContato, { IContrato } from "./useContrato";
import AddIcon from "@mui/icons-material/Add";
import useContrato from "./useContrato";

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
                    onChange: (t: IContrato) => edit(t),
                  },
                  status: {
                    onChange: (t: IContrato) => status(t),
                    checked: (t: IContrato) => t.ativo,
                  },
                  delete: {
                    onChange: (t: IContrato) => del(t),
                  },
                }} />
        </>
    )
}