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
  values: any;
}

export const CustomSelect = ({ size, values, ...props }: Props) => {
  console.log(values)
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
            {values.map((value,index) => {
              return <MenuItem value={index + 1}>{value}</MenuItem>;
            })}

            {/* <MenuItem value={2}>PROFESOR</MenuItem>
            <MenuItem value={3}>ALUMNO</MenuItem> */}
          </TextField>
          {meta.touched && meta.error && (
            <div className="error">{meta.error}</div>
          )}
        </Item>
      </Grid>
    </>
  );
};
