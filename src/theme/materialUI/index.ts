import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      light: "rgba(249, 175, 64,40)",
      main: "rgba(249, 175, 64,90)",
      dark: "rgba(249, 175, 64,100)",
      contrastText: "#fff",
    },

    action: {
      disabledBackground: "rgb(228, 228, 228)",
      disabled: "rgb(152, 151, 153)",
    },
  },
});
