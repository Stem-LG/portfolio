import "../styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Head from "next/head";
import { ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "../theme";
import { useEffect, useState } from "react";
import DarkContext from "../contexts/darkmode";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    const [isDarkMode, setDarkMode] = useState(false);

    useEffect(() => {
        setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }, []);

    return (
        <>
            <Head>
                <title>{"Louay's Portfolio"}</title>
                <meta
                    name="description"
                    content="Personal Porfolio for Louay Ghanney. Built with Next JS"
                />
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                ></meta>
            </Head>
            {/*@ts-ignore*/}
            <DarkContext.Provider value={{ isDarkMode, setDarkMode }}>
                <SessionProvider session={session}>
                    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                        <Component {...pageProps} />
                    </ThemeProvider>
                </SessionProvider>
            </DarkContext.Provider>
        </>
    );
}

export default MyApp;
