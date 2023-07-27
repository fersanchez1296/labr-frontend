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
    { field: "id", headerName: "ID", width: 50 },
    { field: "material", headerName: "Material", width: 250 },
    { field: "fecha", headerName: "Fecha", width: 60 },
    { field: "hora", headerName: "Hora", width: 90 },
    { field: "cantidad_equipos", headerName: "Cantidad de equipo", width: 450 },
    { field: "crn", headerName: "CRN", width: 450 },
    { field: "usuario_usuario", headerName: "Usuario", width: 450 },
    { field: "laboratorio_id", headerName: "Laboratorio", width: 450 },
    {
      field: "Editar",
      headerName: "Editar",
      description: "Editar Laboratório",
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
      description: "Eliminar Laboratório",
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

