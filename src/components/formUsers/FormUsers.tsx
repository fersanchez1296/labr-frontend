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
import { grey, green, red } from "@mui/material/colors";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Formik, Form } from "formik";
import { CustomInput } from "../customInput/CustomInput";
import { userInitialValues } from "../../models/userInitialValues";
import { CustomSelect } from "../customSelect/CustomSelect";
import { userSchema } from "../../schemas/user.schema";
import CircularProgress from "@mui/material/CircularProgress";
import { useCreateUserMutation } from "../../api/api.slice";
import { SnackBar } from "../snackBar/SnackBar";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "transparent" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const FormUsers = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
  const handleClose = () => {
    onClose();
  };

  const [createUser, { isError, error, isSuccess }] = useCreateUserMutation();

  return (
    <div>
      <Dialog fullScreen open={show} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Nuevo Usuario
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
            initialValues={userInitialValues}
            onSubmit={async (values, { setSubmitting,resetForm }) => {
              try {
                setSubmitting(true);
                await createUser(values);
                resetForm()
              } catch (error) {
                console.log(error);
              } finally {
                setSubmitting(false);
                
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
      {isSuccess ? <SnackBar variant="success"  msg="Se agregó la información exitosamente" /> : ""}
      {isError ? <SnackBar variant="error"  msg="Ocurrió un error al agregar la información" /> : ""}
    </div>
  );
};
