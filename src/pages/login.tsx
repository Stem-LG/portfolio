import { Paper, useTheme, Typography, Button, Box } from "@mui/material";
import { signIn, getProviders, getSession } from "next-auth/react";
import Head from "next/head";
import TopAppBar from "../components/appbar";
import { FcGoogle } from "react-icons/fc";

export default function LogIn({ providers }) {
    const theme = useTheme();
    return (
        <>
            <Head>
                <title>Projects</title>
            </Head>
            <TopAppBar />
            <Box
                height="calc(100vh - 64px)"
                sx={{ bgcolor: theme.palette.background.default, display:"flex", flexWrap:"wrap" }}
            >
                <Button
                    startIcon={<FcGoogle />}
                    variant="outlined"
                    onClick={() => {signIn(providers.google.id)}}
                    sx={{
                        minHeight: 50,
                        margin:"auto",
                        color: "red",
                        borderColor: "red",
                        "&:hover": {
                            borderColor: "red",
                        },
                    }}
                >
                    login with Google
                </Button>
            </Box>
        </>
    );
}

export async function getServerSideProps(context: any) {
    const session = await getSession({ req: context.req });
    if (session) {
        return {
            redirect: {
                destination: context.query.callbackUrl || "/",
                permenant: false,
            },
        };
    }
    return {
        props: { providers: await getProviders() },
    };
}
