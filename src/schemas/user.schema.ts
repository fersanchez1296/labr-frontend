import * as yup from "yup";
import { regexNames } from "../utilities/regexForNames.utilities";
import { regexEmail } from "../utilities/regexEmail.utilities";
import { regexPassword } from "../utilities/regexPassword";

export const userSchema = yup.object().shape({
  codigo: yup.number().integer("Debes ingresar un valor entero").positive("Debes ingresar un valor positivo").required("Este campo es requerido"),
  rol_id :  yup.number().oneOf([1,2,3]).required("Este campo es requerido"),
  nombre: yup
    .string()
    .matches(regexNames , {message : "El nombre no puede contener números u otros caractéres"})
    .min(2, "El nombre debe tener al menos dos caractéres")
    .required("Este campo es requerido"),
  apellido_1: yup
    .string()
    .matches(regexNames , {message : "El apellido no puede contener números u otros caractéres"})
    .min(2, "El apellido debe tener al menos dos caractéres")
    .required("Este campo es requerido"),
  apellido_2: yup
    .string()
    .matches(regexNames , {message : "El apellido no puede contener números u otros caractéres"})
    .min(2, "El apellido debe tener al menos dos caractéres")
    .required("Este campo es requerido"),
  password: yup
    .string()
    .matches(regexPassword, {message : "La contraseña debe tener al menos 5 caractéres y debe incluir una letra mayúscula, un número y un caracter especial"})
    .min(5, "La contraseña debe tener al menos 5 caractéres")
    .required("Este campo es requerido"),
  email: yup
    .string()
    .matches(regexEmail, {message : "Debes ingresar un email válido"})
    .email("Por favor ingresa un correo electrónico válido")
    .min(5, "La contraseña debe tener al menos 5 caractéres")
    .required("Este campo es requerido"),
  telefono: yup
    .number()
    .positive("Debes ingresar un valor positivo")
    .integer("Debes ingresar un valor entero")
    .required("Este campo es requerido"),
});
