import {Grid, Typography, useTheme} from "@mui/material"

export default (props)=>{
    const theme = useTheme()
    return (
        <Grid container>
            <Grid item xs={2} alignItems="center" display="flex">
                <hr width="100%" color={theme.palette.primary.main} />
            </Grid>
            <Grid item xs={3}>
                <Typography variant="h4" align="center">
                    {props.title||"Default Title"}
                </Typography>
            </Grid>
            <Grid item xs={7} alignItems="center" display="flex">
                <hr width="100%" color={theme.palette.primary.main} />
            </Grid>
        </Grid>
    );
}