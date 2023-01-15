import {
    Typography,
    Box,
    Button,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    useTheme,
} from "@mui/material";

export default function Project(props) {
    const theme = useTheme();
    return (
        <Card
            sx={{
                height: { xs: 457, xl: 557 },
                width: {
                    xs: 320,
                    sm: 330,
                    xl: 380,
                },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <Box>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    sx={{ height: { xs: 250, xl: 350 } }}
                    image={props.img}
                />
                <CardContent
                    sx={{
                        pt: 0,
                        textAlign: { xs: "center", md: "left" },
                    }}
                >
                    <Typography sx={{ fontSize: { xs: 36, lg: 40 } }}>
                        {props.title}
                    </Typography>
                    <Typography
                        sx={{ fontSize: { xs: 16, lg: 18 } }}
                        color={
                            theme.palette.mode == "dark"
                                ? "secondary"
                                : "initial"
                        }
                    >
                        {props.desc}
                    </Typography>
                </CardContent>
            </Box>
            <CardActions
                sx={{
                    justifyContent: { xs: "center", md: "flex-start" },
                    pb: 2,
                }}
            >
                <a target="_blank" rel="noreferrer" href={props.github}>
                    <Button
                        size="medium"
                        sx={{ borderRadius: "10px 0 10px 0" }}
                    >
                        Github
                    </Button>
                </a>
                <a target="_blank" rel="noreferrer" href={props.live}>
                    <Button
                        disabled={!props.live}
                        size="medium"
                        sx={{ borderRadius: "10px 0 10px 0" }}
                    >
                        Live Demo
                    </Button>
                </a>
            </CardActions>
        </Card>
    );
}
