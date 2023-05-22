import { Box, Button, Typography } from "@mui/material";
import { ParticlesBG } from "../components/background";
import Link from "next/link";
import { MdHome } from "react-icons/md";

export default function Contact() {
    return (
        <Box
            sx={{
                height: "100svh",
                width: "100svw",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                
                textAlign: "center",
                position:"relative"
            }}
        >
            <Typography sx={{ fontSize: "3rem" }}>Contact Page</Typography>
            <Link href="/index2">
                <Button
                    variant="outlined"
                    startIcon={<MdHome />}
                    sx={{ fontSize: "1rem" }}
                >
                    Home
                </Button>
            </Link>
            <ParticlesBG />
        </Box>
    );
}
