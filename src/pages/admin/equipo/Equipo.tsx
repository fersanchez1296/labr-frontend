import { useGetToolsQuery } from "../../../api/api.slice";
import { Spiner } from "../../../components/spiner/Spiner";
import { FormEquipo } from "../../../components/formEquipo/FormEquipo";
import { useState } from "react";
import { Table } from "../../../components/table/Table";
import { columns } from "../../../models/toolsInfoTable.model";
export const Equipo = () => {
  const endpointName = "adminTools"; // Specify the desired endpoint name
  const { data: tools, isError, isLoading, error } = useGetToolsQuery(endpointName);
  const [showForm, setShowForm] = useState(false);

  if (isLoading) return <Spiner showSpiner />;
  if (isError) return <div>{`Error ${console.log(error)}`}</div>;

  if (!tools) {
    return <h2>No hay Información en la Base de Datos</h2>;
  }

  const handleOpenForm = (show: boolean) => {
    setShowForm(show);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <>
      {tools ? (
        <Table data={tools} columns={columns} handleOpenForm={handleOpenForm} />
      ) : (
        "No hay información para mostrar"
      )}
      {showForm && <FormEquipo show={showForm} onClose={handleCloseForm} />}
    </>
  );
}