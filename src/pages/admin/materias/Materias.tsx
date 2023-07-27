import { useGetSubjectsQuery } from "../../../api/api.slice";
import { Spiner } from "../../../components/spiner/Spiner";
import { FormMaterias } from "../../../components/formMaterias/FormMaterias";
import { useState } from "react";
import { Table } from "../../../components/table/Table";
import { columns } from "../../../models/subjectsTableInfo.model";

export const Materias = () => {
  const endpointName = "adminSubjects";
  const { data: subject, isError, isLoading, error } = useGetSubjectsQuery(endpointName);
  const [showForm, setShowForm] = useState(false);

  if (isLoading) return <Spiner showSpiner />;
  if (isError) return <div>{`Error ${console.log(error)}`}</div>;

  if (!subject) {
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
      {subject ? (
        <Table data={subject} columns={columns} handleOpenForm={handleOpenForm} />
      ) : (
        "No hay información para mostrar"
      )}
      {showForm && <FormMaterias show={showForm} onClose={handleCloseForm} />}
    </>
  );
}