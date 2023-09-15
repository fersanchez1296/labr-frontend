import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useDeleteQueryMutation } from "../../api/api.slice";
import { Spiner } from "../spiner/Spiner";
import { SnackBar } from "../snackBar/SnackBar";

interface Props {
  show: boolean;
  onClose: () => void;
  Id: number;
  endpoint : string;
}

export const ConfirmationDialog = ({ show, onClose, Id,endpoint }: Props) => {
  const [deleteQuery, {data, isLoading, isError, isSuccess, error }] =
  useDeleteQueryMutation();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  React.useEffect(() => {
    setOpen(show);
  }, []);

    

    if (isLoading) {
      return <Spiner showSpiner />;
    }
    if (isError) {
      console.log(error);
      return (
        <SnackBar msg={"Ocurrió un error en la petición"} variant={"error"} />
      );
    }
    if (data) {
      console.log(data);
      return (
        <SnackBar msg={`Ocurrió un error en la petición:
        ${data[0]} - code ${data[1]}`} variant={"error"} />
      );
    }

    if (isSuccess)
      return (
        <SnackBar
          msg={`Información eliminada de la base de datos`}
          variant={"success"}
        />
      )

  const handleClose = async() => {
    await deleteQuery({endpoint,Id})
    onClose()
  }

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"PRECAUCIÓN"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Estás a punto de eliminar información de la base de datos ¿Quieres
            continuar con esta acción?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleClose} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
