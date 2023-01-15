import { Paper, useTheme, Typography, Button, Box, Grid } from "@mui/material";
import { signOut, getSession, useSession } from "next-auth/react";
import Head from "next/head";
import TopAppBar from "../components/appbar";
import DarkModeFab from "../components/fab";
import Image from "next/image";

export default function UserInfo() {
    const theme = useTheme();
    const { data: session, status } = useSession();
    console.log(session)
    switch (status) {
        case "loading":
            return (
                <>
                    <Head>
                        <title>Loading...</title>
                    </Head>
                    <Typography color="secondary">Loading</Typography>
                </>
            );
        case "authenticated":
            return (
                <>
                    <Head>
                        <title>userinfo</title>
                    </Head>
                    <TopAppBar />
                    <Box
                        height="calc(100vh - 64px)"
                        sx={{
                            bgcolor: theme.palette.background.default,
                            textAlign: "center",
                            pt: 15,
                        }}
                    >
                        <Paper
                            sx={{
                                width: { xs: "90%", md: "70%" },
                                margin: "0 auto",
                                pt: 5,
                            }}
                        >
                            <Typography mb={5} variant="h3">
                                User Information
                            </Typography>
                            <Grid
                                container
                                spacing={2}
                                sx={{ width: "80%", m: "2rem auto" }}
                                justifyContent="space-between"
                            >
                                <Grid item xs={12}>
                                    <Image
                                        src={
                                            session.user?.image?.toString() ||
                                            ""
                                        }
                                        alt="user image"
                                        width={120}
                                        height={120}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h5" fontWeight="bold">
                                        User Email
                                    </Typography>
                                    <Typography>
                                        {session.user?.email}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h5" fontWeight="bold">
                                        User Name
                                    </Typography>
                                    <Typography>
                                        {session.user?.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h5" fontWeight="bold">
                                        Role
                                    </Typography>
                                    <Typography>
                                        {session.user?.role}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h5" fontWeight="bold">
                                        Session Expiry Date
                                    </Typography>
                                    <Typography>{session.expires}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="large"
                                        sx={{
                                            fontWeight: "bold",
                                            fontSize: 20,
                                        }}
                                        onClick={() => signOut({callbackUrl:"/"})}
                                    >
                                        logout
                                    </Button>
                                </Grid>
                            </Grid>
                            <Typography variant="body1" p={3}>
                                linky.louay.ga is a tool to shorten a URL or
                                reduce the length of a link for making it easy
                                to remember
                            </Typography>
                        </Paper>
                    </Box>
                    <DarkModeFab />
                </>
            );
        case "unauthenticated":
            return (
                <Typography color="error" textAlign="center">
                    Access denied!
                </Typography>
            );
        default:
            return <>unknown error</>;
    }
}

export async function getServerSideProps(context: any) {
    const session = await getSession({ req: context.req });
    if (!session) {
        return {
            redirect: {
                destination: context.query.callbackUrl || "/login",
                permenant: false,
            },
        };
    }
    return {
        props: {
            session,
        },
    };
}
