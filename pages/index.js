import TopAppBar from "../lib/components/appbar";
import DarkModeFab from "../lib/components/fab";
import Home from "../lib/sections/home";
import Projects from "../lib/sections/projects";
import Contact from "../lib/sections/contact";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// import { useState } from "react";
// import { useRef } from "react";

// import useVisiblity from "../lib/hooks/visibility";
// import { useEffect } from "react";

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "common",
                "appbar",
                "home",
                "projects",
                "contact",
            ])),
        },
    };
}

export default function Index(props) {
    // const projectsRef = useRef();

    // const projectsIsVisible = useVisiblity(projectsRef);

    // // setInterval(() => {
    // //     console.log(projectsIsVisible);
    // // }, 1000);

    // console.log(projectsRef);

    return (
        <>
            <TopAppBar />
            <Home id="home" />
            <Projects id="projects" />
            <Contact id="contact" />
            <DarkModeFab />
        </>
    );
}
