//Needs a remake

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
    Box,
} from "@mui/material";
import {
    MdMenu
} from "react-icons/md";
import { useState } from "react";
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
            >
                <List sx={{ width: 280 }}>
                    <IconButton
                        sx={{ m: "0 16px" }}
                        onClick={() => setDrawerIsOpen(false)}
                    >
                        <MdMenu />
                    </IconButton>
                    {props.sections.map((section, key) => (
                        <Box key={key}>
                            {key == 0 ? null : <Divider />}
                            <a
                                href={section.link}
                                style={{ textDecoration: "none" }}
                            >
                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() => setDrawerIsOpen(false)}
                                    >
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
                        </Box>
                    ))}
                </List>
            </Drawer>
        </>
    );
}
