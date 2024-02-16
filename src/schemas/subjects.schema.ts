import * as yup from "yup";
import { regexNames } from "../utilities/regexForNames.utilities";

export const subjectsSchema = yup.object().shape({
  crn: yup
    .number()
    .integer("Debes ingresar un valor entero")
    .positive("Debes ingresar un valor positivo")
    .required("Este campo es requerido"),
  nombre: yup
    .string()
    .matches(regexNames, {
      message: "El nombre no puede contener números u otros caractéres",
    })
    .min(2, "El nombre debe tener al menos dos caractéres")
    .required("Este campo es requerido"),
  semestre: yup
    .string()
    .min(2, "El Semestre debe tener al menos dos caractéres")
    .required("Este campo es requerido"),
  clave: yup
    .string()
    .min(2, "La clave debe tener al menos dos caractéres")
    .required("Este campo es requerido"),
  carrera: yup
    .string()
    .matches(regexNames, {
      message:
        "La carrera no puede contener números u otros caracteres especiales",
    })
    .min(2, "El nombre de la carrera debe tener al menos dos caractéres")
    .required("Este campo es requerido"),
});
