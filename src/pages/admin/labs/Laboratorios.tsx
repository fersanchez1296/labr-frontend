import { useGetLabsQuery } from "../../../api/api.slice";
import { Spiner } from "../../../components/spiner/Spiner";
import { FormLab } from "../../../components/formLab/FormLab";
import { useState } from "react";
import { Table } from "../../../components/table/Table";
import { columns } from "../../../models/labTableInfo.model";

export const Laboratorios = () => {
  const { data: labs, isError, isLoading, error } = useGetLabsQuery({});
  const [showForm, setShowForm] = useState(false);

  if (isLoading) return <Spiner showSpiner />;
  if (isError) return <div>{`Error ${console.log(error)}`}</div>;

  if (!labs) {
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
      {labs ? (
        <Table data={labs} handleOpenForm={handleOpenForm} columns={columns}/>
      ) : (
        "No hay información para mostrar"
      )}
      {showForm && <FormLab show={showForm} onClose={handleCloseForm} />}
    </>
  );
}