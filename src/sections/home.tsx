import { Typography, Box, Button, Grid } from "@mui/material";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import Tilt from "react-parallax-tilt";

export default function Home(props) {
    return (
        <Box sx={{ height: "calc(100vh - 64px)",width:"100%", display: "flex", justifyContent:"space-between", alignItems:"center" }}>
            <Box
                justifyContent="center"
                display="flex"
                textAlign={{ xs: "center", lg: "left" }}
                flexDirection="column"
                pl={{ lg: "6rem" }}
                sx={{
                    width:{xs:"100%",lg:"65%"}
                }}
            >
                <Typography variant="h6">Hello there, My name is</Typography>
                <Typography
                    variant="h2"
                    color="primary"
                    fontWeight="bold"
                    sx={{  }}
                >
                    Louay Ghanney
                </Typography>
                <Typography variant="h5">
                    I&apos;m a&nbsp;
                    <Typewriter
                        words={[
                            "FullStack Developer",
                            "ML Enthusiast",
                            "Freelancer",
                        ]}
                        cursor
                        cursorStyle="!"
                        cursorBlinking={true}
                        typeSpeed={50}
                        deleteSpeed={25}
                        delaySpeed={2500}
                        loop={false}
                    />
                </Typography>
                <Typography mt={3}>{"Based in Nabeul, Tunisia"}</Typography>
                <Box
                    sx={{
                        display: "flex",
                        gap: "1rem",
                        mt: "1rem",
                        justifyContent: { xs: "center", lg: "left" },
                    }}
                >
                    {[
                        { title: "Get in touch", link: "#contact" },
                        {
                            title: "Resume",
                            link: "/assets/docs/cv_english.pdf",
                        },
                    ].map(({ title, link }, i) => (
                        <Tilt
                            key={i}
                            scale={1.06}
                            tiltMaxAngleX={10}
                            tiltMaxAngleY={10}
                        >
                            <a
                                href={link}
                                target={link[0] == "#" ? "" : "_blank"}
                                rel="noreferrer"
                            >
                                <Button
                                    variant="outlined"
                                    sx={{ borderRadius: "10px 0 10px 0" }}
                                >
                                    {title}
                                </Button>
                            </a>
                        </Tilt>
                    ))}
                </Box>
            </Box>
            <Box sx={{display:{xs:"none", lg:"block"}, height:"100%", width:"80%" }}>
                <Image
                    alt="background_image"
                    src="/assets/images/web_desn_img.png"
                    width={1024}
                    height={1024}
                    style={{width:"100%",height:"100%", objectFit:"scale-down"}}
                />
            </Box>
        </Box>
    );
}
