interface userValues {
  codigo: number | string;
  rol_id: number;
  nombre: string;
  apellido_1: string;
  apellido_2: string;
  password: string;
  telefono: number | string;
  correo: string;
}

export const userInitialValues: userValues = {
  codigo: "",
  rol_id: 1,
  nombre: "",
  apellido_1: "",
  apellido_2: "",
  password: "",
  telefono: "",
  correo: "",
};
