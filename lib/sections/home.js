import { Typography, Box, useTheme, Button, Grid } from "@mui/material";
import Image from "next/image";

export default function Home(props) {
    const theme = useTheme();
    return (
        <Grid
            id={props.id}
            container
            height="calc(100vh - 64px)"
            sx={{ bgcolor: theme.palette.background.default }}
        >
            <Grid
                xs={12}
                md={7}
                item
                container
                sx={{ bgcolor: theme.palette.background.default }}
                justifyContent="center"
                display="flex"
                textAlign={{xs:"center",md:"left"}}
                flexDirection="column"
                pl={{md:8}}
            >
                <Typography variant="h6">{"Hello There, I'm"}</Typography>
                <AnimatedName />
                <Typography variant="h4">I make awesome Websites</Typography>
                <Typography mt={3}>
                    Full Stack Developer, Technology lover & Quick learner
                    <br />
                    Based in Nabeul, Tunisia
                </Typography>
                <Grid item container direction="row" mt={0} spacing={2} justifyContent={{xs:"center",md:"initial"}}>
                    <Grid item display={{xs:"none",md:"block"}}>
                        <Button
                            variant="outlined"
                            sx={{ borderRadius: "10px 0 10px 0" }}
                        >
                            Get in touch!
                        </Button>
                    </Grid>

                    <Grid item>
                        <a
                            href="/assets/docs/resume.pdf"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Button
                                variant="outlined"
                                sx={{ borderRadius: "10px 0 10px 0" }}
                            >
                                Resumé
                            </Button>
                        </a>
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                item
                xs={5}
                sx={{ bgcolor: theme.palette.background.default }}
                display={{xs:"none",md:"block"}}
            >
                <Image
                    alt="background_image"
                    src="/assets/images/web_desn_img.png"
                    layout="intrinsic"
                    height="2500"
                    width="2500"
                />
                <Box />
            </Grid>
        </Grid>
    );
}

function AnimatedName() {
    return (
        <>
            <Typography
                variant="h2"
                color="primary"
                fontWeight="bold"
                sx={{ mt: -2 }}
            >
                Louay Ghanney
            </Typography>
        </>
    );
}
