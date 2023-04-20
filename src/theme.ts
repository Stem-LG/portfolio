import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: { main: "#0050ff" },
    },
    typography: {
        fontFamily: "Flama",
    },
    components: {
        MuiAppBar: {
            defaultProps:{
                sx:{
                    bgcolor:"primary.light"
                }
            }
        }
    }
});

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: { main: "#3f51b5" },
    },
    typography: {
        fontFamily: "Flama",
    }

});

export { lightTheme, darkTheme };
