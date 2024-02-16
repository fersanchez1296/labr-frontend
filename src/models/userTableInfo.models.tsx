import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "rol", headerName: "ROL", width: 100 },
  { field: "codigo", headerName: "CÓDIGO", width: 100 },
  { field: "nombre", headerName: "NOMBRE", width: 450 },
  { field: "telefono", headerName: "TELÉFONO", width: 100 },
  { field: "correo", headerName: "CORREO", width: 200 },
  {
    field: "Editar",
    headerName: "EDITAR",
    description: "Editar usuario",
    sortable: false,
    width: 130,
  },
  {
    field: "Eliminar",
    headerName: "ELIMINAR",
    description: "Eliminar Usuario",
    sortable: false,
    width: 160,
  },
];
