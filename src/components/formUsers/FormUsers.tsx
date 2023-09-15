import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Box from "@mui/material/Box";
import { grey, green } from "@mui/material/colors";
import { Grid } from "@mui/material";
import { Formik, Form } from "formik";
import { CustomInput } from "../customInput/CustomInput";
import { userInitialValues } from "../../models/userInitialValues";
import { CustomSelect } from "../customSelect/CustomSelect";
import { userSchema } from "../../schemas/user.schema";
import CircularProgress from "@mui/material/CircularProgress";
import { useNewQueryMutation, useGetSingleQuery,useUpdateQueryMutation } from "../../api/api.slice";
import { SnackBar } from "../snackBar/SnackBar";
import { Item } from "../../utilities/item.utilities";
import { Spiner } from "../spiner/Spiner";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  show: boolean;
  onClose: () => void;
  userId: number,
  getSingleEndpoint : string;

}

export const FormUsers = ({ show, onClose, userId,getSingleEndpoint }: Props) => {
  console.log(getSingleEndpoint)
  const endpoint = "adminUser-update"
  const handleClose = () => {onClose()};
  
  const [newQuery, { isError : isErrorCreate, isSuccess : isSuccessCreate }] = useNewQueryMutation();
  const {
    data: users,
    isError: isErrorUser,
    isLoading,
    error: errorUser,
  } = useGetSingleQuery({endpoint, id : userId});
  const [updateQuery,{isError : errorUpdate, isSuccess : successUpdate}] = useUpdateQueryMutation()


  if (isLoading) {
    return (
      <>
        <Spiner showSpiner />
        <SnackBar
          msg={"Usuario encontrado en la base de datos"}
          variant={"success"}
        />
      </>
    );
  }

  

  if (isErrorUser || users === undefined) {
    return (
      <>
        <div>{`Error ${errorUser}`}</div>
        <SnackBar msg={"Ocurrió un error en la petición"} variant={"error"} />
      </>
    );
  }

  

  return (
    <>
      <Dialog
        fullScreen
        open={show}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h4" component="div">
              {userId === 0 ? "Nevo Usuario" : "Editar Usuario"}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: grey[300],
            padding: "0 1rem ",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Formik
            validationSchema={userSchema}
            enableReinitialize={true}
            initialValues={userId !== 0 ? users[0] : userInitialValues}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
                try {
                  setSubmitting(true);
                  userId === 0 ? await newQuery(values) : await updateQuery(values);
                } catch (error) {
                  console.log(error);
                } finally {
                  setSubmitting(false);
                  resetForm();
                }
            }}
          >
            {({ handleSubmit, handleChange, values, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <Grid container spacing={1}>
                  <CustomInput
                    id="codigo"
                    label="Código"
                    name="codigo"
                    value={values.codigo}
                    onChange={handleChange}
                    size={6}
                    type="number"
                  />

                  <CustomSelect
                    id="rol"
                    label="Rol de usuario"
                    name="rol_id"
                    value={values.rol_id}
                    onChange={handleChange}
                    size={6}
                    type="select"
                  />
                  <CustomInput
                    id="nombre"
                    label="Nombre"
                    name="nombre"
                    value={values.nombre}
                    onChange={handleChange}
                    size={12}
                    type="text"
                  />
                  <CustomInput
                    id="apellido_1"
                    label="Apellido 1"
                    name="apellido_1"
                    value={values.apellido_1}
                    onChange={handleChange}
                    size={6}
                    type="text"
                  />
                  <CustomInput
                    id="apellido_2"
                    label="Apellido 2"
                    name="apellido_2"
                    value={values.apellido_2}
                    onChange={handleChange}
                    size={6}
                    type="text"
                  />
                  <CustomInput
                    id="password"
                    label="Contraseña"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    size={6}
                  />
                  <CustomInput
                    id="telefono"
                    label="Teléfono"
                    name="telefono"
                    value={values.telefono}
                    onChange={handleChange}
                    size={6}
                    type="number"
                  />
                  <CustomInput
                    id="email"
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    size={12}
                    type="email"
                  />

                  <Grid item xs={12}>
                    <Item>
                      <Button
                        variant="contained"
                        type="submit"
                        disabled={isSubmitting}
                        sx={{ width: "100%", height: "100%" }}
                      >
                        {isSubmitting ? (
                          <CircularProgress
                            size={24}
                            sx={{
                              color: green[500],
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              marginTop: "-12px",
                              marginLeft: "-12px",
                            }}
                          />
                        ) : (
                          "Guardar"
                        )}
                      </Button>
                    </Item>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Dialog>
      {isSuccessCreate ? (
        <SnackBar
          variant="success"
          msg="Se agregó la información exitosamente"
        />
      ) : (
        ""
      )}
      {isErrorCreate ? (
        <SnackBar
          variant="error"
          msg="Ocurrió un error al agregar la información"
        />
      ) : (
        ""
      )}
      {successUpdate ? (
        <SnackBar
          variant="success"
          msg="Se modificó el usuario exitosamente"
        />
      ) : (
        ""
      )}
      {errorUpdate ? (
        <SnackBar
          variant="error"
          msg="Ocurrió un error al modificar el usuario"
        />
      ) : (
        ""
      )}
    </>
  );
};
