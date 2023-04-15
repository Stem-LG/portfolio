import TopAppBar from "../components/appbar";
import DarkModeFab from "../components/fab";
import Home from "../sections/home";
import Projects from "../sections/projects";
import Contact from "../sections/contact";
import Footer from "../components/footer";
import Certifications from "../sections/certifications";

export default function Index(props) {
    return (
        <>
            <TopAppBar />
            <Home id="home" />
            <Certifications id="certifications"/>
            <Projects id="projects" />
            <Contact id="contact" />
            <Footer/>
            <DarkModeFab />
        </>
    );
}
