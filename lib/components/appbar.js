import {
    AppBar,
    Toolbar,
    Typography,
    Tabs,
    Tab,
    Button,
    Menu,
    MenuItem,
    Box,
    useTheme,
    IconButton,
    Grid,
} from "@mui/material";
import { useState } from "react";
import { MdMenu, MdHome, MdOutlineListAlt, MdMessage } from "react-icons/md";
import MyDrawer from "./drawer";

export default function TopAppBar() {
    const theme = useTheme();

    const sections = [
        { title: "Home", icon: <MdHome />, link: "#home" },
        { title: "Projects", icon: <MdOutlineListAlt />, link: "#projects" },
        { title: "Contact", icon: <MdMessage />, link: "#contact" },
    ];

    return (
        <>
            <AppBar position="fixed">
                <Toolbar
                    sx={{
                        justifyContent: "space-between",
                        bgcolor: theme.palette.background.default,
                        boxShadow: "3px white",
                    }}
                >
                    <MyDrawer sections={sections} />

                    <Typography
                        variant="h6"
                        sx={{ border: 0.8, p: 0.5 }}
                        fontWeight="light"
                        // color="#1e1e1e"
                    >
                        Louay Ghanney
                    </Typography>
                    <MdTrailing sections={sections} />
                    <IconButton
                        onClick={() => {}}
                        sx={{ display: { md: "none" } }}
                    >
                        <MdMenu color={theme.palette.background.default} />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box height={{ xs: "48px", sm: "64px" }} />
        </>
    );
}

function MdTrailing(props) {
    const [tabValue, setTabValue] = useState(0);

    return (
        <Grid
            container
            direction="row"
            width="auto"
            sx={{ display: { xs: "none", md: "flex" } }}
        >
            <Tabs
                value={tabValue}
                onChange={(e, newTabValue) => setTabValue(newTabValue)}
                aria-label="nav menu"
                textColor="primary"
                indicatorColor="primary"
            >
                {props.sections.map((section, key) => {
                    <Tab key={key} label={section.title} disableRipple></Tab>;
                    {
                        console.log(section);
                    }
                })}
                <Tab label="about" disableRipple></Tab>
                <Tab label="projects" disableRipple></Tab>
                <Tab label="contact" disableRipple></Tab>
            </Tabs>
            <Button variant="outlined" color="primary" sx={{ ml: 4 }}>
                Resumé
            </Button>
            <MdLangSwitcher sx={{ ml: 4 }} />
        </Grid>
    );
}

function MdLangSwitcher(props) {
    const [currentLang, setCurrentLang] = useState("english");
    const [anchorEl, setAnchorEl] = useState(null);
    return (
        <>
            <Button
                onClick={(e) => {
                    setAnchorEl(e.currentTarget);
                }}
                color="primary"
                {...props}
            >
                {currentLang}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem
                    onClick={() => {
                        setCurrentLang("English");
                        setAnchorEl(null);
                    }}
                >
                    English
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        setCurrentLang("French");
                        setAnchorEl(null);
                    }}
                >
                    French
                </MenuItem>
            </Menu>
        </>
    );
}
