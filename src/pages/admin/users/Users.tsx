import { useGetUsersQuery } from "../../../api/api.slice";
import { Spiner } from "../../../components/spiner/Spiner";
import { FormUsers } from "../../../components/formUsers/FormUsers";
import { useState } from "react";
import { Table } from "../../../components/table/Table";
import { columns } from "../../../models/userTableInfo.models";
import { SnackBar } from "../../../components/snackBar/SnackBar";

export const Users = () => {
  const endpointName = "adminTeacher"; // Specify the desired endpoint name
  const { data: users, isError, isLoading, error } = useGetUsersQuery(endpointName);
  const [showForm, setShowForm] = useState(false);


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
  <SnackBar msg={"Ocurrió un error en la pteición"} variant={"error"}/>
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

  const handleOpenForm = (show: boolean) => {
    setShowForm(show);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <>
    {users ? (
        <Table data={users} columns={columns} handleOpenForm={handleOpenForm} />
      ) : (
        "No hay información para mostrar"
      )}
      {showForm && <FormUsers show={showForm} onClose={handleCloseForm} />}
    </>

  );
};