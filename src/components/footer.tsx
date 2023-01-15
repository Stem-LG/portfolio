import { Grid, Box, Button, Typography, useTheme } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Footer() {
    const theme = useTheme();
    const {data: session} = useSession();
    return (
        <Grid
            container
            sx={{
                backgroundColor: theme.palette.background.default,
                borderTop: 1,
                borderColor: theme.palette.primary.main,
            }}
        >
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
                <Typography sx={{ textAlign: "center" }}>
                    Software is Licenced under GPL 3.0{" "}
                </Typography>
            </Grid>
            <Grid item xs={2}>
                {!session?<Link href="/login">
                    <Button size="small">Admin Login</Button>
                </Link>:""}
            </Grid>
        </Grid>
    );
}
