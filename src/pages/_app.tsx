import "../styles/globals.css";
import Head from "next/head";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "../theme";
import { SessionProvider } from "next-auth/react";
import { darkMode } from "../atoms";
import { useAtomValue } from "jotai";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    // const isDarkMode = useAtomValue(darkMode);
    const isDarkMode = true;

    // useEffect(() => {
    //     setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    // }, []);

    return (
        <>
            <Head>
                <title>{"Louay's Portfolio"}</title>
                <meta
                    name="description"
                    content="Personal Porfolio for Louay Ghanney. Built with Next JS"
                />
                <link rel="icon" href="/favicon.ico" />
                <link href="/fonts/flama.css" rel="stylesheet" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                ></meta>
            </Head>
            {/*@ts-ignore*/}
            <SessionProvider session={session}>
                <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
            </SessionProvider>
        </>
    );
}

export default MyApp;
