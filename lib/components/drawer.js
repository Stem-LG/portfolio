import {
    Drawer,
    IconButton,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useTheme,
    Divider,
    Collapse,
} from "@mui/material";
import {
    MdMenu,
    MdHome,
    MdOutlineListAlt,
    MdMessage,
    MdArrowDropDown,
    MdArrowRight,
    MdTranslate,
} from "react-icons/md";
import { useState } from "react";
import { useRouter } from "next/router";
import { Languages } from "../languages";

export default function MyDrawer(props) {
    const theme = useTheme();

    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    return (
        <>
            <IconButton
                onClick={() => setDrawerIsOpen(true)}
                sx={{ display: { md: "none" } }}
            >
                <MdMenu />
            </IconButton>
            <Drawer
                anchor="left"
                open={drawerIsOpen}
                onClose={() => setDrawerIsOpen(false)}
                PaperProps={{
                    sx: {
                        backgroundColor: theme.palette.background.default,
                    },
                }}
            >
                <List sx={{ width: 280 }}>
                    <IconButton
                        sx={{ m: "0 16px" }}
                        onClick={() => setDrawerIsOpen(false)}
                    >
                        <MdMenu />
                    </IconButton>
                    {props.sections.map((section, key) => (
                        <>
                            {key == 0 ? null : <Divider />}
                            <a
                                href={section.link}
                                style={{ textDecoration: "none" }}
                                key={key}
                            >
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {section.icon}
                                        </ListItemIcon>
                                        <ListItemText>
                                            <Typography variant="body1">
                                                {section.title}
                                            </Typography>
                                        </ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            </a>
                        </>
                    ))}
                    <XsLangSwitcher />
                </List>
            </Drawer>
        </>
    );
}

function XsLangSwitcher(props) {
    const [open, setOpen] = useState(false);

    const router = useRouter();

    const theme = useTheme();

    const initLang = Languages.find((l) => l.locale == router.locale);
    const [CurrentLang, setCurrentLang] = useState(
        Boolean(initLang) ? initLang : Languages[0]
    );

    function handleClick() {
        setOpen(!open);
    }

    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <MdTranslate
                        color={open ? theme.palette.primary.main : ""}
                    />
                </ListItemIcon>
                <ListItemText>
                    <Typography
                        variant="body1"
                        color={open ? "primary" : "secondary"}
                    >
                        {CurrentLang.display}
                    </Typography>{" "}
                </ListItemText>
                <ListItemIcon sx={{ minWidth: "0px" }}>
                    <MdArrowDropDown />
                </ListItemIcon>
            </ListItemButton>
            <Collapse in={open} unmountOnExit>
                <List disablePadding>
                    {Languages.map((Language) => (
                        <ListItemButton
                            key={Language}
                            sx={{
                                pl:
                                    Language.locale == CurrentLang.locale
                                        ? 3
                                        : 6,
                                bgcolor: "#0001",
                            }}
                            onClick={() => {
                                setCurrentLang({
                                    loacale: Language.locale,
                                    display: Language.display,
                                });
                                router.push("", "", {
                                    locale: Language.locale,
                                });
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    display:
                                        Language.locale == CurrentLang.locale
                                            ? ""
                                            : "none",
                                }}
                            >
                                <MdArrowRight
                                    color={theme.palette.primary.main}
                                />
                            </ListItemIcon>
                            <ListItemText>
                                <Typography
                                    variant="body1"
                                    color={
                                        Language.locale == CurrentLang.locale
                                            ? "primary"
                                            : "secondary"
                                    }
                                >
                                    {Language.display}
                                </Typography>
                            </ListItemText>
                        </ListItemButton>
                    ))}
                </List>
            </Collapse>
        </>
    );
}
