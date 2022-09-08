import { Typography, Box, useTheme, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useContext } from "react";
import darkmode from "../contexts/darkmode";
import Image from "next/image"

export default () => {
    const { isDarkMode } = useContext(darkmode);
    const theme = useTheme();
    return (
        <Grid container height="calc(100vh - 64px)" sx={{bgcolor:theme.palette.background.default}}>
            <Grid xs={7} sx={{bgcolor:theme.palette.background.default}} justifyContent="center" display="flex" flexDirection="column" pl={8}>
                <Typography variant="h6">Hello There, I'm</Typography>
                <AnimatedName />
                <Typography variant="h4">I make awesome Websites</Typography>
                <Typography mt={3}>
                    Full Stack Developer, Technology lover & Quick learner
                    <br />
                    Based in Nabeul, Tunisia
                </Typography>
                <Button sx={{width:140,mt:2}} variant="outlined" >Get in touch!</Button>
            </Grid>
            <Grid xs={5} sx={{bgcolor:theme.palette.background.default}}>
              <Image src="/assets/images/web_desn_img.png" layout="intrinsic" height="2500" width="2500"/>
              <Box/>
            </Grid>
        </Grid>
    );
};

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
