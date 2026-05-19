import DataTable from "@/layout/componets/DataTable";
import useColegio from "./useColegio";

export default function Colegio() {
  const {
    action: {},
    data: { listColegio },
  } = useColegio();
  return (
    <>      
      <DataTable
        data={listColegio}
        columns={[
          { key: "nome", label: "nome" },
          { key: "horario", label: "horario" },          
        ]}
      />
    </>
  );
}
