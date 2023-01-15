import {Grid, Typography, useTheme} from "@mui/material"

export default function Divider(props){
    const theme = useTheme()
    return (
        <Grid container id={props.id} sx={props.sx}>
            <Grid item xs={3} md={2} alignItems="center" display="flex">
                <hr style={{width: "100%"}} color={theme.palette.primary.main} />
            </Grid>
            <Grid item xs={6} md={3}>
                <Typography variant="h4" align="center">
                    {props.title||"Default Title"}
                </Typography>
            </Grid>
            <Grid item xs={3} md={7} alignItems="center" display="flex">
                <hr style={{width: "100%"}} color={theme.palette.primary.main} />
            </Grid>
        </Grid>
    );
}