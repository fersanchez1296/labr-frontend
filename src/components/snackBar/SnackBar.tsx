import { useSnackbar, VariantType } from "notistack";
import React from "react";

export const SnackBar = ({ msg, variant }: { msg: string, variant: VariantType }) => {
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    enqueueSnackbar(msg, { variant });
  }, []);

  return null;
};
