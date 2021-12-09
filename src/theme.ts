import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#D8919B",
    },
    secondary: {
      main: "#e0d2d2",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
