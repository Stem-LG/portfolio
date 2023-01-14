import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Menu,
    MenuItem,
    Box,
    useTheme,
    IconButton,
    Grid,
} from "@mui/material";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import {
    MdHome,
    MdOutlineListAlt,
    MdMessage,
    MdMail,
    MdKeyboardArrowDown,
    MdTranslate,
} from "react-icons/md";
import MyDrawer from "./drawer";
import { useRouter } from "next/router";
import { Languages } from "../languages";

export default function TopAppBar() {
    const { t } = useTranslation("appbar");

    const theme = useTheme();

    const sections = [
        { title: t("home"), icon: <MdHome />, link: "/#home" },
        { title: t("projects"), icon: <MdOutlineListAlt />, link: "/#projects" },
        { title: t("contact"), icon: <MdMessage />, link: "/#contact" },
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
                        sx={{
                            border: 0.8,
                            p: 0.5,
                            borderRadius: "10px 0 10px 0",
                        }}
                        fontWeight="light"
                        color="primary"
                    >
                        Louay Ghanney
                    </Typography>
                    <MdTrailing sections={sections} Languages={Languages} />
                    <Box sx={{ display: { md: "none" } }}>
                        <XsLangSwitcher Languages={Languages}/>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box height={{ xs: "48px", sm: "64px" }} />
        </>
    );
}

function MdTrailing(props) {
    return (
        <Grid
            container
            direction="row"
            width="auto"
            spacing={2}
            sx={{ display: { xs: "none", md: "flex" } }}
        >
            {props.sections.map((section, key) => {
                return (
                    <Grid item key={key}>
                        <a href={section.link}>
                            <Button
                                variant="contained"
                                color="primary"
                                key={key}
                                sx={{ borderRadius: "10px 0 10px 0" }}
                            >
                                {section.title}
                            </Button>
                        </a>
                    </Grid>
                );
            })}
            <Grid item>
                <MdLangSwitcher Languages={props.Languages} />
            </Grid>
        </Grid>
    );
}

function MdLangSwitcher(props) {
    const router = useRouter();

    const initLang = props.Languages.find((l) => l.locale == router.locale);
    const [CurrentLang, setCurrentLang] = useState(
        Boolean(initLang) ? initLang : props.Languages[0]
    );
    const [anchorEl, setAnchorEl] = useState(null);
    return (
        <>
            <Button
                onClick={(e) => {
                    setAnchorEl(e.currentTarget);
                }}
                color="primary"
                {...props}
                sx={{ borderRadius: "10px 0 10px 0" }}
            >
                <MdKeyboardArrowDown size={20} />
                {CurrentLang.display}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                {props.Languages.map((value, key) => (
                    <MenuItem
                        key={key}
                        onClick={() => {
                            setCurrentLang(value.display);
                            setAnchorEl(null);
                            router.push("", "", { locale: value.locale });
                        }}
                    >
                        {value.display}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}

function XsLangSwitcher(props) {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState(null);
    return (
        <>
            <IconButton
                onClick={(e) => {
                    setAnchorEl(e.currentTarget);
                }}
                color="primary"
                {...props}
                sx={{ borderRadius: "10px 0 10px 0" }}
            >
                <MdTranslate />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                {props.Languages.map((value, key) => (
                    <MenuItem
                        key={key}
                        onClick={() => {
                            setAnchorEl(null);
                            router.push("", "", { locale: value.locale });
                        }}
                    >
                        {value.display}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}
