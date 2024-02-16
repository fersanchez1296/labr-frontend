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
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Formik, Form } from "formik";
import MenuItem from "@mui/material/MenuItem";
import { labInitialValues } from "../../models/labInitialValues.model";
import { labSchema } from "../../schemas/lab.schema";
import { CustomInput } from "../customInput/CustomInput";
import { CustomSelect } from "../customSelect/CustomSelect";
import CircularProgress from "@mui/material/CircularProgress";
import {
  useNewQueryMutation,
  useGetSingleQuery,
  useUpdateQueryMutation,
} from "../../api/api.slice";
import { SnackBar } from "../snackBar/SnackBar";
import { Spiner } from "../spiner/Spiner";

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

interface Props {
  show: boolean;
  onClose: () => void;
  userId: number;
  endpoint : string;
}

export const FormLab = ({ show, onClose, userId,endpoint }: Props) => {
  const handleClose = () => {
    onClose();
  };


  const [
    newQuery,
    {
      data: infoQueryCreate,
      isError: isErrorCreate,
      isSuccess: isSuccessCreate,
    },
  ] = useNewQueryMutation();
  const {
    data: users,
    isError: isErrorUser,
    isLoading,
    error: errorUser,
  } = useGetSingleQuery({ endpoint : endpoint + "-getOne", id: userId });
  const [
    updateQuery,
    { data: infoQuery, isError: errorUpdate, isSuccess: successUpdate },
  ] = useUpdateQueryMutation();
  


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

  
  console.log(users);
  
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
            <Typography sx={{ ml: 2, flex: 1 }} variant="h4" component="div">
              {userId === 0 ? "Nuevo Laboratório" : "Editar Laboratório"}
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
            validationSchema={labSchema}
            enableReinitialize={true}
            initialValues={userId !== 0 ? users[0] : labInitialValues}
            onSubmit={async (values, { setSubmitting, setValues }) => {
              try {
                setSubmitting(true);
                userId === 0
                  ? await newQuery({ endpoint : endpoint + "-create", values })
                  : await updateQuery({ endpoint : endpoint + "-update", values });
              } catch (error) {
                console.log(error);
              } finally {
                setSubmitting(false);
                setTimeout(() => {
                  handleClose();
                }, 2000);
                setValues(labInitialValues);
              }
            }}
          >
            {({ handleSubmit, handleChange, values, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <Grid container spacing={1}>
                  <CustomInput
                    id="id"
                    label="ID"
                    name="id"
                    value={values.id}
                    onChange={handleChange}
                    size={6}
                    type="number"
                    disabled
                  />
                  <CustomInput
                    id="capacidad"
                    label="Capacidad"
                    name="capacidad"
                    value={values.capacidad}
                    onChange={handleChange}
                    size={6}
                    type="number"
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
                    id="edificio"
                    label="Edificio"
                    name="edificio"
                    value={values.edificio}
                    onChange={handleChange}
                    size={12}
                    type="text"
                  />
                  {userId ? (
                    <CustomInput
                    id="responsable"
                    label="Responsable"
                    name="responsable"
                    value={values.responsable}
                    onChange={handleChange}
                    size={12}
                    type="text"
                    disabled
                  />
                  ) : null}
                  {!userId ? (
                    <CustomInput
                    id="usuario_codigo"
                    label="Código Responsable"
                    name="usuario_codigo"
                    value={values.usuario_codigo}
                    onChange={handleChange}
                    size={12}
                    type="text"
                  />
                  ) : null}
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
      {infoQueryCreate && infoQueryCreate.success ? (
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
      {infoQuery && infoQuery.success ? (
        <SnackBar variant="success" msg={infoQuery.message} />
      ) : (
        ""
      )}
      {errorUpdate ? <SnackBar variant="error" msg={infoQuery.message} /> : ""}
    </div>
  );
};
