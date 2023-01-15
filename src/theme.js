import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
    palette: {
        mode: "light",
        background: {
            default: "#DEBA9D",
            paper: "#FEDABD",
            appbar: "#DEBA9D",
        },
        primary: {
            main:"#ef2222"
        },
        secondary: {
            main:"#6f4c5b"
        },
        // error: {},
        // warning: {},
        // info: {},
        // success: {},
    },
    typography: {
        allVariants: {
            color: "#6f4c5b",
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "#1A1A1A ",
        },
        primary: {
            main: "#bd3b22",
        },
        secondary: {
            main: "#edcac3",
        },
        // error: {},
        // warning: {},
        // info: {},
        // success: {},
    },
    typography: {
        allVariants: {
            color: "#edcac3",
        },
    },
});

export { lightTheme, darkTheme };
