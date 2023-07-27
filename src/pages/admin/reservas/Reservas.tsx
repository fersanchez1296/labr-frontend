import { useGetUsersQuery } from "../../../api/api.slice";
import { Spiner } from "../../../components/spiner/Spiner";
import { FormReservas } from "../../../components/formReservas/FormReservas";
import { useState } from "react";
import { Table } from "../../../components/table/Table";
import { columns } from "../../../models/userTableInfo.models";
export const Reservas = () => {
  const endpointName = "adminReservations"; // Specify the desired endpoint name
  const { data: users, isError, isLoading, error } = useGetUsersQuery(endpointName);
  const [showForm, setShowForm] = useState(false);

  if (isLoading) return <Spiner showSpiner />;
  if (isError) return <div>{`Error ${console.log(error)}`}</div>;

  if (!users) {
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
      {users ? (
        <Table data={users} columns={columns} handleOpenForm={handleOpenForm} />
      ) : (
        "No hay información para mostrar"
      )}
      {showForm && <FormReservas show={showForm} onClose={handleCloseForm} />}
    </>
  );
}