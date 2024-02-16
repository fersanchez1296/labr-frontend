import * as React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser, resetUser, UserKey } from "../../redux/states/user";
import { getRolUser } from "../../services/auth.services";
import { clearLocalStorage } from "../../utilities/localStorage.utilities";
import { Formik, Form } from "formik";
import { Item } from "../../utilities/item.utilities";
import { Grid } from "@mui/material";
import { loginSchema } from "../../schemas/login.schema";
import { CustomInput } from "../../components/customInput/CustomInput";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import { loginInitialValues } from "../../models/loginInitialValues";
import { Box, Container } from "@mui/system";
import CssBaseline from "@mui/material/CssBaseline";
import cuvalles4 from "/public/assets/img/cuvalles4.jpeg";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ListItemIcon from "@mui/material/ListItemIcon";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageLogin, setMessageLogin] = React.useState();
  const [loginSuccess, setLoginSuccess] = React.useState(false);
  useEffect(() => {
    clearLocalStorage(UserKey);
    dispatch(resetUser());
    navigate(`/`, { replace: true });
  }, []);

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const login = async (codigo: number, password: string) => {
    try {
      const result = await getRolUser(codigo, password);
      console.log(result);
      const rol = result ? result.rol : "";
      setMessageLogin(result.message);
      if (result.success) {
        handleClickOpen();
        setLoginSuccess(true);
      } else {
        handleClickOpen();
        setLoginSuccess(false);
      }
      dispatch(createUser({ ...result, rol }));
      setTimeout(() => {
        if (rol === "ALUMNO") {
          navigate(`/student`, { replace: true });
        } else if (rol === "ADMINISTRADOR") {
          navigate(`/admin`, { replace: true });
        } else {
          navigate(`/teacher`, { replace: true });
        }
        handleClose();
      }, 4000);
    } catch (error) {}
  };
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh", // Ajusta según sea necesario
          backgroundImage: `url(${cuvalles4})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundColor: "rgba(255, 255, 255, 0.1)", // Ajusta la opacidad según sea necesario
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            minWidth: "100vw",
            backgroundColor: "rgba(255, 255, 255, 0.4)", // Ajusta la opacidad según sea necesario
          }}
        >
          <Formik
            validationSchema={loginSchema}
            enableReinitialize={true}
            initialValues={loginInitialValues}
            onSubmit={async (values) => {
              await login(values.codigo, values.password);
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
                    size={12}
                    type="number"
                  />

                  <CustomInput
                    id="password"
                    label="Contraseña"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    size={12}
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
                          "Iniciar Sesión"
                        )}
                      </Button>
                    </Item>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Container>
      </Box>
      {/* Dialogo para inicio de sesión */}

      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent
          dividers
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h3" component="div">
            {messageLogin}
            <ListItemIcon
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "30vh",
              }}
            >
              {loginSuccess ? (
                <CheckCircleIcon sx={{ fontSize: "4rem", color: "green" }} />
              ) : (
                <CancelIcon sx={{ fontSize: "4rem", color: "red" }} />
              )}
            </ListItemIcon>
          </Typography>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};
export default Login;
