import * as yup from "yup";
import { regexNames } from "../utilities/regexForNames.utilities";

export const labSchema = yup.object().shape({
  id: yup
    .number()
    .integer("Debes ingresar un valor entero")
    .positive("Debes ingresar un valor positivo"),
  codigo_responsable: yup
    .number()
    .integer("Debes ingresar un valor entero")
    .positive("Debes ingresar un valor positivo"),
  nombre: yup
    .string()
    .matches(regexNames, {
      message: "El nombre no puede contener números u otros caractéres",
    })
    .min(2, "El nombre debe tener al menos dos caractéres")
    .required("Este campo es requerido"),
  edificio: yup
    .string()
    .min(2, "El nombre del laboratório debe tener al menos dos caractéres")
    .required("Este campo es requerido"),
  capacidad: yup
    .number()
    .integer("Debes ingresar un valor entero")
    .positive("Debes ingresar un valor positivo")
    .required("Este campo es requerido"),
  responsable: yup
    .string()
    .matches(regexNames, {
      message: "El nombre no puede contener números u otros caractéres",
    })
    .min(2, "El nombre debe tener al menos dos caractéres"),
});
