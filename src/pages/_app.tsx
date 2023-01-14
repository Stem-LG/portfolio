import "../styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Head from "next/head";
import { ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "../lib/theme";
import { useEffect, useState } from "react";
import { appWithTranslation, useTranslation } from "next-i18next";
import DarkContext from "../lib/contexts/darkmode";



function MyApp({ Component, pageProps }) {
    const { t } = useTranslation();

    const [isDarkMode, setDarkMode] = useState(false);

    useEffect(() => {
        setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }, []);

    return (
        <>
            <Head>
                <title>{t("website-title")}</title>
                <meta name="description" content={t("website-description")} />
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                ></meta>
            </Head>
            {/*@ts-ignore*/}
            <DarkContext.Provider value={{ isDarkMode, setDarkMode }}>
                <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                    <Component {...pageProps} />
                </ThemeProvider>
            </DarkContext.Provider>
        </>
    );
}

export default appWithTranslation(MyApp);
