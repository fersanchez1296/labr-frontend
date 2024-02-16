import * as yup from "yup";
import { regexPassword } from "../utilities/regexPassword";

export const loginSchema = yup.object().shape({
  codigo: yup.number().integer("Debes ingresar un valor entero").positive("Debes ingresar un valor positivo").required("Este campo es requerido"),
  password: yup
    .string()
    .matches(regexPassword, {message : "La contraseña debe tener al menos 5 caractéres y debe incluir una letra mayúscula, un número y un caracter especial"})
    .min(5, "La contraseña debe tener al menos 5 caractéres")
    .required("Este campo es requerido"),
});
