import { TextField } from "@mui/material";
import { useField } from "formik";
import { Item } from "../../utilities/item.utilities";
import { Grid } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

interface Props {
  label: string;
  name: string;
  onChange: (event: React.ChangeEvent<any>) => void;
  value: number | string;
  size: number;
  type: string;
  id: string;
}



export const CustomSelect = ({ size, ...props }: Props) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Grid item xs={size}>
        <Item>
          <TextField
            {...field}
            {...props}
            select
            value={field.value || ""} // Use field.value as the selected value
            sx={{ width: "100%", height: "100%" }}
          >
            <MenuItem disabled value="">
              Selecciona el rol del usuario
            </MenuItem>
            <MenuItem value={1}>ADMINISTRADOR</MenuItem>
            <MenuItem value={2}>PROFESOR</MenuItem>
            <MenuItem value={3}>ALUMNO</MenuItem>
          </TextField>
          {meta.touched && meta.error && (
            <div className="error">{meta.error}</div>
          )}
        </Item>
      </Grid>
    </>
  );
};
