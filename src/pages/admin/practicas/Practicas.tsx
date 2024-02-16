import { Spiner } from "../../../components/spiner/Spiner";
import { useState } from "react";
import { Table } from "../../../components/table/Table";
import { columns } from "../../../models/practiceTableInfo.model";
import { SnackBar } from "../../../components/snackBar/SnackBar";
import { ConfirmationDialog } from "../../../components/confirmationDialog/ConfirmationDialog";
import { useGetAllQuery } from "../../../api/api.slice";
import { FormPracticas } from "../../../components/formPracticas/FormPracticas";

export const Practicas = () => {
  const endpointName = "AdminPractices"; 
  const { data: users, isError, isLoading, error } = useGetAllQuery(endpointName);
  const [showForm, setShowForm] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [userId, setUserId] = useState(0)


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

  if (!users) {
    return (
      <>
      <h2>Sin contenido</h2>
      <SnackBar msg={"No hay información en la base de datos"} variant={"warning"}/>
      </>
    )
  }

  const handleOpenForm = (show: boolean, userId: number) => {
    console.log(userId);
    setShowForm(show);
    userId !== undefined ? setUserId(userId) : setUserId(0)
  };

  const handleOpenDialog = (show: boolean, userId: number) => {
    setShowDialog(show);
    userId !== undefined ? setUserId(userId) : setUserId(0)
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  return (
    <>
    {users ? (
        <Table data={users} columns={columns} handleOpenForm={handleOpenForm} handleOpenDialog={handleOpenDialog} />
      ) : (
        "No hay información para mostrar"
      )}
      {showForm && <FormPracticas show={showForm} userId={userId} onClose={handleCloseForm} getSingleEndpoint={"adminUser-update"}/>}
      {showDialog && <ConfirmationDialog show={showDialog} Id={userId} onClose={handleCloseDialog} endpoint={"adminUser-delete"}/>}
    </>

  );
};