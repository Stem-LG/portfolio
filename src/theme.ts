import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
    palette: {
        mode: "light",
    }, typography: {
        fontFamily: "Flama",
    }
});

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
    typography:{
        fontFamily: "Flama",
    }

});

export { lightTheme, darkTheme };
