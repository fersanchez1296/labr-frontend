import {
    GridColDef,
    GridRenderCellParams,
    GridTreeNodeWithRender,
  } from "@mui/x-data-grid";
  import Button from "@mui/material/Button";
  import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
  import BorderColorIcon from "@mui/icons-material/BorderColor";
  import { edit } from "../utilities/editItem.utilities";
  import { drop } from "../utilities/dropItem.utilities";


export const columns: GridColDef[] = [
    { field: "codigo", headerName: "CÓDIGO", width: 100 },
    { field: "nombre", headerName: "NOMBRE", width: 450 },
    { field: "telefono", headerName: "Teléfono", width: 100 },
    { field: "email", headerName: "EMAIL", width: 200 },
    {
      field: "Editar",
      headerName: "Editar",
      description: "Editar usuario",
      sortable: false,
      width: 130,
      renderCell: (
        params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
      ): React.ReactNode => {
        return (
          <Button
            variant="contained"
            onClick={edit}
            style={{ backgroundColor: "green" }}
          >
            <BorderColorIcon />
          </Button>
        );
      },
    },
    {
      field: "Eliminar",
      headerName: "Eliminar",
      description: "Eliminar Usuario",
      sortable: false,
      width: 160,
      renderCell: (
        params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
      ): React.ReactNode => {
        return (
          <Button
            variant="contained"
            onClick={drop}
            style={{ backgroundColor: "red" }}
          >
            <DeleteForeverIcon />
          </Button>
        );
      },
    },
  ];

