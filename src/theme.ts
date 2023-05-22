import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: { main: "#ffc500" },
    },
    typography: {
        fontFamily: "Flama",
        allVariants: {
            color: "#ffc500"
        }  
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
        primary: { main: "#ffc500" },
    
    },
    typography: {
        fontFamily: "Flama",
        allVariants:{
            color:"#ffc500"
        }
    }
    ,
    components:{
        MuiOutlinedInput:{
            defaultProps:{
                sx:{
                    ".MuiOutlinedInput-notchedOutline , .MuiOutlinedInput-notchedOutline:hover ":{
                        borderColor: "primary.dark"
                    }
                }
            }
        }
    }

});

export { lightTheme, darkTheme };
