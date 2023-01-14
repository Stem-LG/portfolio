import {Grid} from "@mui/material";


export default function Socials(){
    return (
        <Grid
            container
            sx={{ position: "absolute", left: 16, bottom: 16 }}
            color="secondary"
            onClick={() => setDarkMode(!isDarkMode)}
        >
           
        </Grid>
    );
}