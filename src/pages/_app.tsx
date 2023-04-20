import "../styles/globals.css";
import Head from "next/head";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "../theme";
import { useEffect, useState } from "react";
import DarkContext from "../contexts/darkmode";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    const [isDarkMode, setDarkMode] = useState(true);

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
            <DarkContext.Provider value={{ isDarkMode, setDarkMode }}>
                <SessionProvider session={session}>
                    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                        <CssBaseline/>
                        <Component {...pageProps} />
                    </ThemeProvider>
                </SessionProvider>
            </DarkContext.Provider>
        </>
    );
}

export default MyApp;
