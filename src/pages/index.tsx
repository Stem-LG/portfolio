import TopAppBar from "../components/appbar";
import DarkModeFab from "../components/fab";
import Home from "../sections/home";
import Projects from "../sections/projects";
import Contact from "../sections/contact";
import Footer from "../components/footer";

export default function Index(props) {
    return (
        <>
            <TopAppBar />
            <Home id="home" />
            <Projects id="projects" />
            <Contact id="contact" />
            <Footer/>
            <DarkModeFab />
        </>
    );
}
