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
import { grey } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Formik, Form } from "formik";
import MenuItem from "@mui/material/MenuItem";

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

export const FormReservas = ({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) => {
  const handleClose = () => {
    onClose();
  };

  const currencies = [
    {
      value: "1",
      label: "Administrador",
    },
    {
      value: "2",
      label: "Profesor",
    },
    {
      value: "3",
      label: "Alumno",
    },
  ];

  return (
    <div>
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
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Nueva Reservación
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Guardar
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: grey[300],
            padding: "0 1rem ",
            display : "flex",
            alignItems : "center"
          }}
        >
          <Formik initialValues={""} onSubmit={() => ""}>
            <Form>
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <Item>
                    <TextField
                      id="codigo"
                      label="Código"
                      variant="outlined"
                      sx={{ width: "100%", height: "100%" }}
                    />
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <TextField
                      id="rol"
                      select
                      label="Rol"
                      defaultValue={1}
                      sx={{ width: "100%", height: "100%" }}
                    >
                      {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Item>
                </Grid>
                <Grid item xs={12}>
                  <Item>
                    <TextField
                      id="nombre"
                      label="Nombre"
                      variant="outlined"
                      sx={{ width: "100%", height: "100%" }}
                    />
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <TextField
                      id="apellido-1"
                      label="Apellido 1"
                      variant="outlined"
                      sx={{ width: "100%", height: "100%" }}
                    />
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <TextField
                      id="apellido-2"
                      label="Apellido 2"
                      variant="outlined"
                      sx={{ width: "100%", height: "100%" }}
                    />
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <TextField
                      id="password"
                      label="Contraseña"
                      type="password"
                      sx={{ width: "100%", height: "100%" }}
                    />
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <TextField
                      id="confirm-password"
                      label="Confima tu contraseña"
                      type="password"
                      sx={{ width: "100%", height: "100%" }}
                    />
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <TextField
                      id="email"
                      label="Email"
                      variant="outlined"
                      sx={{ width: "100%", height: "100%" }}
                    />
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <TextField
                      id="telefono"
                      label="Teléfono"
                      variant="outlined"
                      sx={{ width: "100%", height: "100%" }}
                    />
                  </Item>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Dialog>
    </div>
  );
};
