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
} from "@mui/material";
import { MdMenu, MdHome, MdOutlineListAlt, MdMessage } from "react-icons/md";
import { useState } from "react";

export default function MyDrawer(props){
    const theme = useTheme();

    const drawerItems = [
        { title: "Home", icon: <MdHome />, link: "#home" },
        { title: "Projects", icon: <MdOutlineListAlt />, link: "#projects" },
        { title: "Contact", icon: <MdMessage />, link: "#contact" },
    ];

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
                        <a
                            href={section.link}
                            style={{ textDecoration: "none" }}
                            key={key}
                        >
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>{section.icon}</ListItemIcon>
                                    <ListItemText>
                                        <Typography
                                            variant="body1"
                                            color="initial"
                                        >
                                            {section.title}
                                        </Typography>{" "}
                                    </ListItemText>
                                </ListItemButton>
                            </ListItem>
                        </a>
                    ))}
                </List>
            </Drawer>
        </>
    );
};
