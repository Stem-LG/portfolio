import Grid from "@mui/material/Unstable_Grid2";


export default ()=>{
    return (
        <Grid
            sx={{ position: "absolute", left: 16, bottom: 16 }}
            color="secondary"
            onClick={() => setDarkMode(!isDarkMode)}
        >
           
        </Grid>
    );
}