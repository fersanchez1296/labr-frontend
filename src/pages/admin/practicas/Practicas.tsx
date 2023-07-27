import { useGetPracticesQuery } from "../../../api/api.slice";
import { Spiner } from "../../../components/spiner/Spiner";
import { FormPracticas } from "../../../components/formPracticas/FormPracticas";
import { useState } from "react";
import { Table } from "../../../components/table/Table";
import { columns } from "../../../models/practiceTableInfo.model";

export const Practicas = () => {
  const endpointName = "adminPractices";
  const { data: practice, isError, isLoading, error } = useGetPracticesQuery(endpointName);
  const [showForm, setShowForm] = useState(false);

  if (isLoading) return <Spiner showSpiner />;
  if (isError) return <div>{`Error ${console.log(error)}`}</div>;

  if (!practice) {
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
      {practice ? (
        <Table data={practice} columns={columns} handleOpenForm={handleOpenForm} />
      ) : (
        "No hay información para mostrar"
      )}
      {showForm && <FormPracticas show={showForm} onClose={handleCloseForm} />}
    </>
  );
}