interface labValues {
    id: number | string;
    nombre: string;
    edificio: string;
    capacidad: number | string;
    responsable : string;
    codigo_responsable : string | number;
  }
  
  export const labInitialValues: labValues = {
    id: "",
    nombre: "",
    edificio: "",
    capacidad: "",
    responsable : "",
    codigo_responsable : "",
  };
  