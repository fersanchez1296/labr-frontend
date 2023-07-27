import { DataGrid,GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";

interface props {
  data: [];
  handleOpenForm: (show: boolean) => void;
  columns : GridColDef[]
}

export const Table = ({ columns,data, handleOpenForm }: props) => {
  const openForm = () => {
    handleOpenForm(true);
  };

  const rows = data.map((row: {}, index: number) => ({
    ...row,
    id: index + 1,
  }));


  return (
    <div
      style={{
        height: 400,
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <DataGrid rows={rows} columns={columns} />
      <Button variant="contained" endIcon={<AddBoxIcon />} onClick={openForm}>
        Nuevo
      </Button>
    </div>
  );
};
