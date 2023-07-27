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
    { field: "crn", headerName: "CRN", width: 90 },
    { field: "nombre", headerName: "Nombre", width: 300 },
    { field: "semestre", headerName: "Semestre", width: 120 },
    { field: "carrera", headerName: "Carrera", width: 90 },
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

