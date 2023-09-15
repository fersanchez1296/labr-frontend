import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridTreeNodeWithRender,
} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import * as React from "react";

interface props {
  data: [];
  handleOpenForm: (show: boolean, userId: number) => void;
  handleOpenDialog : (show: boolean, userId: number) => void;
  columns: GridColDef[];
}

export const Table = ({ columns, data, handleOpenForm,handleOpenDialog }: props) => {
  const openForm = (
    params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
  ) => {
    const foundElement = data.find((el, index) => {
      if (el.codigo) {
        return index + 1 === params.id ? true : false;
      } else if (el.crn) {
        return index + 1 === params.id ? true : false;
      }else if (el.id) {
        return index + 1 === params.id ? true : false;
      }
      return false; // Añadimos un caso por defecto para cuando ninguna condición se cumple
    });
    
    const id = foundElement ? (foundElement.codigo || foundElement.crn || foundElement.id) : undefined;
    handleOpenForm(true, id);
  };

  const openDialog = (
    params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
  ) => {
    const foundElement = data.find((el, index) => {
      if (el.codigo) {
        return index + 1 === params.id ? true : false;
      } else if (el.crn) {
        return index + 1 === params.id ? true : false;
      }else if (el.id) {
        return index + 1 === params.id ? true : false;
      }
      return false; // Añadimos un caso por defecto para cuando ninguna condición se cumple
    });
    
    const id = foundElement ? (foundElement.codigo || foundElement.crn || foundElement.id) : undefined;
    handleOpenDialog(true, id);
  };



  const columnsWithBtn = columns.map((col) => {
    if (col.field === "Editar") {
      return {
        ...col,
        renderCell: (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>): React.ReactNode => {
          return (
            <Button
              variant="contained"
              onClick={() => openForm(params)}
              style={{ backgroundColor: "green" }}
            >
              <BorderColorIcon />
            </Button>
          );
        },
      };
    } else if (col.field === "Eliminar") {
      return {
        ...col,
        renderCell: (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>): React.ReactNode => {
          return (
            <Button
              variant="contained"
              onClick={() => openDialog(params)} 
              style={{ backgroundColor: "red" }}
            >
              <DeleteForeverIcon />
            </Button>
          );
        },
      };
    } else {
      return col; // For other columns, simply return the original column object
    }
  });
  

  const rows = data.map((row: {}, index: number) => ({
    ...row,
    id: index + 1,
  }));

  return (
    <div
      style={{
        height: 450,
        width: "95%",
        display: "flex",
        margin: "5rem 0",
        flexDirection: "column",
      }}
      className="tableContainer"
    >
      <DataGrid rows={rows} columns={columnsWithBtn} />
      <Button
        variant="contained"
        endIcon={<AddBoxIcon />}
        onClick={() => openForm("")}
      >
        Nuevo
      </Button>
    </div>
  );
};
