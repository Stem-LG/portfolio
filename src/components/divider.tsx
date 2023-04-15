import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";

export default function Divider(props) {
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.up("sm"))

    return (
        <Box  id={props.id} sx={{...props.sx, display:"flex", alignItems:"center"}}>
            <hr style={{ width: sm?"20%":"100%"}} color={theme.palette.primary.main} />

            <Typography variant="h4" sx={{mx:"1rem"}}>
                {props.title || "Default Title"}
            </Typography>

            <hr style={{ width: "100%" }} color={theme.palette.primary.main} />
        </Box>
    );
}
