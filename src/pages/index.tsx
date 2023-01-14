import TopAppBar from "../lib/components/appbar";
import DarkModeFab from "../lib/components/fab";
import Home from "../lib/sections/home";
import Projects from "../lib/sections/projects";
import Contact from "../lib/sections/contact";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

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
