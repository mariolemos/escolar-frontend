import DataTable from "@/layout/componets/DataTable";
import useColegio from "./useColegio";
import AddIcon from '@mui/icons-material/Add';

export default function Colegio() {
  const {
    action: {},
    data: { listColegio },
  } = useColegio();
  return (
    <>      
      <DataTable
      titulo="Lista de Colégios"
      buttonList={[
                    {
                        nome: "novo",
                        icon: <AddIcon sx={{ marginRight: 1 }} />,
                        redirect: "/exemplo/form"
                    },                    
                ]}
        data={listColegio}
        columns={[
          { key: "nome", label: "nome" },
          { key: "horario", label: "horario" },          
        ]}
      />
    </>
  );
}
