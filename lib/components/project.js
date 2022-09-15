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
    const theme = useTheme()
    return (
        <Card
            sx={{
                maxWidth: 300,
                height: 450,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <Box>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="250"
                    image={props.img}
                />
                <CardContent sx={{textAlign:{xs:"center",md:"left"}}}>
                    <Typography gutterBottom variant="h4">
                        {props.title}
                    </Typography>
                    <Typography variant={{xs:"body2",md:"body2"}} color={theme.palette.mode=="dark"?"secondary":"initial"} >
                        {props.desc}
                    </Typography>
                </CardContent>
            </Box>
            <CardActions sx={{justifyContent:{xs:"center",md:"flex-start"}}}>
                <a target="_blank" rel="noreferrer" href={props.github}>
                    <Button size="small">Github</Button>
                </a>
                <a target="_blank" rel="noreferrer" href={props.live}>
                    <Button disabled={!props.live != ""} size="small">
                        Live Demo
                    </Button>
                </a>
            </CardActions>
        </Card>
    );
}
