import { useGetAllQuery } from "../../../api/api.slice";
import { Spiner } from "../../../components/spiner/Spiner";
import { FormMaterias } from "../../../components/formMaterias/FormMaterias";
import { useState } from "react";
import { Table } from "../../../components/table/Table";
import { columns } from "../../../models/subjectsTableInfo.model";
import { ConfirmationDialog } from "../../../components/confirmationDialog/ConfirmationDialog";
import { SnackBar } from "../../../components/snackBar/SnackBar";

export const Materias = () => {
  const endpoint = "adminSubjects";
  const { data: subjects, isError, isLoading, error } = useGetAllQuery(endpoint);
  const [showForm, setShowForm] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [itemId, setItemId] = useState(0)

  if (isLoading) {
    return (
      <>
        <Spiner showSpiner />
        <SnackBar msg={"Información encontrada en la base de datos"} variant={"success"}/>
      </>
    );
  }
  if (isError) return(
  <>
  <div>{`Error ${error}`}</div>
  <SnackBar msg={"Ocurrió un error en la petición"} variant={"error"}/>
  </>
  );

  if (!subjects) {
    return (
      <>
      <h2>Sin contenido</h2>
      <SnackBar msg={"No hay información en la base de datos"} variant={"warning"}/>
      </>
    )
  }

  const handleOpenForm = (show: boolean, Id: number) => {
    setShowForm(show);
    Id !== undefined ? setItemId(Id) : setItemId(0);
  };

  const handleOpenDialog = (show: boolean, Id: number) => {
    setShowDialog(show);
    Id !== undefined ? setItemId(Id) : setItemId(0)
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  console.log(subjects)
  return (
    <>
    {subjects ? (
        <Table data={subjects} columns={columns} handleOpenForm={handleOpenForm} handleOpenDialog={handleOpenDialog} />
      ) : (
        "No hay información para mostrar"
      )}
      {showForm && <FormMaterias show={showForm} userId={itemId} onClose={handleCloseForm} endpoint={endpoint}/>}
      {showDialog && <ConfirmationDialog show={showDialog} Id={itemId} onClose={handleCloseDialog} endpoint={endpoint + "-delete"}/>}
    </>

  );
};