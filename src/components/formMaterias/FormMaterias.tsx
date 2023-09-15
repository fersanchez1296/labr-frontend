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
import { subjectInitialValues } from "../../models/subjectsInitialValues";
import { CustomSelect } from "../customSelect/CustomSelect";
import { subjectSchema } from "../../schemas/subjects.schema";
import CircularProgress from "@mui/material/CircularProgress";
import {
  useNewQueryMutation,
  useGetSingleQuery,
  useUpdateQueryMutation,
} from "../../api/api.slice";
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
  itemId: number;
}

export const FormMaterias = ({ show, onClose, itemId }: Props) => {
  const handleClose = () => {
    onClose();
  };

  const [newQuery, { isError: isErrorCreate, isSuccess: isSuccessCreate }] =
    useNewQueryMutation();
  const {
    data: subjects,
    isError: isErrorSubject,
    isLoading,
    error: errorSubject,
  } = useGetSingleQuery(itemId);
  const [updateQuery, { isError: errorUpdate, isSuccess: successUpdate }] =
    useUpdateQueryMutation();

  if (isLoading) {
    return (
      <>
        <Spiner showSpiner />
        <SnackBar
          msg={"Información encontrada en la base de datos"}
          variant={"success"}
        />
      </>
    );
  }

  if (isErrorSubject || subjects === undefined) {
    return (
      <>
        <div>{`Error ${errorSubject}`}</div>
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
              {itemId === 0 ? "Nueva Materia" : "Editar Materia"}
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
            validationSchema={subjectSchema}
            enableReinitialize={true}
            initialValues={itemId !== 0 ? subjects[0] : subjectInitialValues}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                setSubmitting(true);
                itemId === 0
                  ? await newQuery(values)
                  : await updateQuery(values);
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
                <Grid container spacing={5}>
                  <CustomInput
                    id="crn"
                    label="CRN"
                    name="crn"
                    value={values.crn}
                    onChange={handleChange}
                    size={6}
                    type="number"
                  />
                  <CustomInput
                    id="semestre"
                    label="Semestre"
                    name="semestre"
                    value={values.semestre}
                    onChange={handleChange}
                    size={6}
                    type="text"
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
                    id="carrera"
                    label="Carrera"
                    name="carrera"
                    value={values.carrera}
                    onChange={handleChange}
                    size={12}
                    type="text"
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
        <SnackBar variant="success" msg="Se modificó la información exitosamente" />
      ) : (
        ""
      )}
      {errorUpdate ? (
        <SnackBar
          variant="error"
          msg="Ocurrió un error al modificar la información"
        />
      ) : (
        ""
      )}
    </>
  );
};
