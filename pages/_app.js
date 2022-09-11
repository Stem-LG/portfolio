import "../styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Head from "next/head";
import { ThemeProvider, FormControlLabel, Switch } from "@mui/material";
import { lightTheme, darkTheme } from "../lib/theme";
import { useEffect, useState, pro } from "react";
import { appWithTranslation } from "next-i18next";
import DarkContext from "../lib/contexts/darkmode";

function MyApp({ Component, pageProps }) {
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
                    content="Personal Porfolio for Louay Ghanney"
                />
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                ></meta>
            </Head>
            <DarkContext.Provider value={{ isDarkMode, setDarkMode }}>
                <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                    <Component {...pageProps} />
                </ThemeProvider>
            </DarkContext.Provider>
        </>
    );
}

export default appWithTranslation(MyApp);
