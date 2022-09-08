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
    useTheme, IconButton, Grid,
} from "@mui/material";
import { useState } from "react";
import {MdMenu} from "react-icons/md"

export default function TopAppBar() {
    const theme = useTheme()
    return (
        <>
            <AppBar position="fixed">
                <Toolbar
                    sx={{
                        justifyContent: "space-between",
                        bgcolor: theme.palette.background.default,
                        boxShadow: "3px white"
                    }}
                >
                   
                    <Typography
                        variant="h6"
                        sx={{ border: 0.8, p: 0.5 }}
                        fontWeight="light"
                        // color="#1e1e1e"
                    >
                        Louay Ghanney
                    </Typography>
                    <MdTrailing />
                </Toolbar>
            </AppBar>
            <Box height={{ xs: "48px", sm: "64px" }} />
        </>
    );
}

function MdTrailing() {
    return (
        <Grid container direction="row" width="auto" >
            <MdTabs />
            <Button variant="outlined" color="primary" sx={{ ml: 4 }}>
                Resumé
            </Button>
            <MdLangSwitcher sx={{ ml: 4 }} />
        </Grid>
    );
}

function MdTabs() {
    const [tabValue, setTabValue] = useState(0);

    return (
        <Tabs
            value={tabValue}
            onChange={(e, newTabValue) => setTabValue(newTabValue)}
            aria-label="nav menu"
            textColor="primary"
            indicatorColor="primary"
        >
            <Tab label="about" disableRipple></Tab>
            <Tab label="projects" disableRipple></Tab>
            <Tab label="contact" disableRipple></Tab>
        </Tabs>
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
