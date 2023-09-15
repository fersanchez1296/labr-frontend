import {createSlice} from "@reduxjs/toolkit"

export const openFormsSlice = createSlice({
    name: "openForms", // Nombre del slice
    initialState: false, // Estado inicial (valor booleano para abrir o cerrar el formulario)
    reducers: {
      // Reducer para cambiar el estado del formulario
      toggleForm: (state) => {
        return !state; // Invierte el valor booleano al llamar esta acción
      },
    },
  });


  export const { toggleForm } = openFormsSlice.actions;
  