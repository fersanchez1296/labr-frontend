import * as yup from "yup";
import { regexNames } from "../utilities/regexForNames.utilities";

export const practiceSchema = yup.object().shape({
  id: yup
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
  descripcion: yup
    .string()
    .matches(regexNames, {
      message: "El apellido no puede contener números u otros caractéres",
    })
    .min(2, "El apellido debe tener al menos dos caractéres")
    .required("Este campo es requerido"),
  archivo: yup
    .string()
    .matches(regexNames, {
      message: "El apellido no puede contener números u otros caractéres",
    })
    .min(2, "El apellido debe tener al menos dos caractéres")
    .required("Este campo es requerido"),
});
