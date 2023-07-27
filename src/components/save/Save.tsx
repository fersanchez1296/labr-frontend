import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";

interface Props {
  submit : (msg : string) => void
}

export const Save = ({submit} : Props) => {
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const timer = React.useRef<number>();
  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };
  const submitCallback = () => {
    submit("Estoy enviando")
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };
  return (
    <Box sx={{ m: 1, position: "relative" }}>
      <Fab
        aria-label="save"
        color="primary"
        sx={buttonSx}
        type="submit"
        onClick={submitCallback}
      >
        {success ? <CheckIcon /> : <SaveIcon />}
      </Fab>
      {loading && (
        <CircularProgress
          size={68}
          sx={{
            color: green[500],
            position: "absolute",
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};
