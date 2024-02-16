import { TextField } from "@mui/material";
import { useField } from "formik";
import { Item } from "../../utilities/item.utilities";
import { Grid } from "@mui/material";

interface Props {
  label: string;
  name: string;
  onChange: (event: React.ChangeEvent<any>) => void;
  value: number | string;
  size : number
  type : string
  id : string
  disabled? : Boolean
}

export const CustomInput = ({ size,value, ...props }: Props) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Grid item xs={size}>
        <Item>
          <TextField
            {...field}
            {...props}
            variant="outlined"
            sx={{ width: "100%", height: "100%" }}
            className={meta.touched && meta.error ? "input-error" : ""}
          />
          {meta.touched && meta.error && (
            <div className="error">{meta.error}</div>
          )}
        </Item>
      </Grid>
    </>
  );
};
