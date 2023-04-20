import { Grid, Box, Button, Typography, useTheme } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Footer() {
    const theme = useTheme();
    const { data: session } = useSession();
    return (
        <Box
            sx={{
                borderTop: 1,
                borderColor: "primary.main",
                height: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            {!session ? (
                <Link href="/login">
                    <Button size="small" sx={{ width: "4rem" }}>
                        Admin
                    </Button>
                </Link>
            ) : (
                <Box sx={{ width: "4rem" }} />
            )}
            <Typography sx={{fontSize:"0.8rem", whiteSpace:"nowrap"}}>Software is Licenced under GPL 3.0 </Typography>
            <Box sx={{ width: "4rem" }} />
        </Box>
    );
}
