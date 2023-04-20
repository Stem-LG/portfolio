import {
    Paper,
    useTheme,
    Typography,
    Button,
    Box,
    Grid,
    IconButton,
    Collapse,
    Select,
    MenuItem,
} from "@mui/material";
import { signOut, getSession, useSession } from "next-auth/react";
import Head from "next/head";
import TopAppBar from "../components/appbar";
import DarkModeFab from "../components/fab";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MessageType } from "../types/types";
import {
    MdKeyboardArrowDown,
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdRefresh,
} from "react-icons/md";

export default function UserInfo() {
    const { data: session, status } = useSession();

    switch (status) {
        case "loading":
            return (
                <>
                    <Head>
                        <title>Loading...</title>
                    </Head>
                    <Typography color="secondary">Loading</Typography>
                </>
            );
        case "authenticated":
            return (
                <>
                    <Head>
                        <title>userinfo</title>
                    </Head>
                    <TopAppBar />
                    <Paper
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", lg: "row" },
                            justifyContent: "center",
                            gap: "3rem",
                            mx: { md: "10%" },
                            mt: { md: "5rem" },
                            p: { sm: "3rem" },
                            mb: "70svh",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "0.5rem",
                            }}
                        >
                            <Typography
                                variant="h3"
                                sx={{ textAlign: "center", my: "1rem" }}
                                color="primary"
                            >
                                User Information
                            </Typography>

                            <Image
                                src={session.user?.image?.toString() || ""}
                                alt="user image"
                                width={120}
                                height={120}
                            />

                            {[
                                { name: "Email", value: session.user?.email },
                                { name: "Username", value: session.user?.name },
                                { name: "Role", value: session.user?.role },
                            ].map(({ name, value }, key) => (
                                <Box key={key} sx={{ textAlign: "center" }}>
                                    <Typography sx={{ fontSize: "2rem" }}>
                                        {name}
                                    </Typography>
                                    <Typography>{value}</Typography>
                                </Box>
                            ))}

                            <Button
                                variant="contained"
                                color="error"
                                size="large"
                                onClick={() => signOut({ callbackUrl: "/" })}
                            >
                                logout
                            </Button>
                        </Box>
                        <MessagesPaper />
                    </Paper>

                    <DarkModeFab />
                </>
            );
        case "unauthenticated":
            return (
                <Typography color="error" textAlign="center">
                    Access denied!
                </Typography>
            );
        default:
            return <>unknown error</>;
    }
}

function MessagesPaper() {
    const [messages, setMessages] = useState<MessageType[]>();
    const [page, setPage] = useState(0);
    const [messagesShownNumber, setMessagesShowNumber] = useState(5);
    const [loading, setLoading] = useState(false);

    const numPages = Math.ceil(messages?.length / messagesShownNumber);

    function fetchMessages() {
        setLoading(true);
        fetch("api/messages", {
            method: "GET",
            headers: { "Content-type": "application/json" },
        })
            .then((res) => res.json())
            .then((data) => {
                setMessages(data);
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <Paper
            sx={{
                width: "100%",
                minHeight: "20rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            }}
            elevation={6}
        >
            <Box
                sx={{
                    height: "3rem",
                    bgcolor: "primary.main",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Select
                    sx={{ ml: "1rem" }}
                    size="small"
                    value={messagesShownNumber}
                    onChange={(e) =>
                        setMessagesShowNumber(Number(e.target.value))
                    }
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={-1}>all</MenuItem>
                </Select>
                <Typography variant="h5">Messages</Typography>
                <IconButton
                    onClick={() => fetchMessages()}
                    sx={{
                        mr: "1rem",
                        animation: loading
                            ? "infinite_rotation 1.2s ease-in-out infinite"
                            : "",
                    }}
                >
                    <MdRefresh />
                </IconButton>
            </Box>
            {messages
                ?.slice(
                    page * messagesShownNumber,
                    (page + 1) * messagesShownNumber
                )
                .map((message, key) => (
                    <Message key={key} {...message} />
                ))}
            <Box
                sx={{
                    height: "3rem",
                    bgcolor: "primary.main",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    mt:"auto"
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                        disabled={page == 0}
                        onClick={() => page > 0 && setPage(page - 1)}
                    >
                        <MdKeyboardArrowLeft />
                    </IconButton>
                    <Typography sx={{ width: "2rem", textAlign: "center" }}>
                        {page + 1}
                    </Typography>
                    <IconButton
                        disabled={page == numPages - 1}
                        onClick={() => numPages > page + 1 && setPage(page + 1)}
                    >
                        <MdKeyboardArrowRight />
                    </IconButton>
                </Box>
            </Box>
        </Paper>
    );
}

function Message(data: MessageType) {
    const { name, email, subject, message } = data;

    const date = new Date(data.date);

    const [expanded, setExpanded] = useState<boolean>(false);

    return (
        <Paper
            sx={{
                width: "calc(100% - 2rem)",
                mx: "1rem",
                px: "1rem",
                py: "0.25rem",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    height: "1.5rem",
                }}
            >
                <Typography variant="body2">{name}</Typography>

                <Typography variant="body2" color="GrayText">
                    {date.toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "1.75rem",
                }}
            >
                <Typography variant="body2">
                    {subject || "no subject"}
                </Typography>
                <Typography variant="body2">{email}</Typography>
            </Box>
            <Collapse in={expanded}>{message}</Collapse>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography
                    variant="body2"
                    sx={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    {expanded ? " " : message}
                </Typography>
                <IconButton
                    onClick={() => setExpanded(!expanded)}
                    sx={{
                        transform: expanded ? "rotate(180deg)" : "",
                        transition: "transform 0.2s",
                    }}
                    size="small"
                >
                    <MdKeyboardArrowDown />
                </IconButton>
            </Box>
        </Paper>
    );
}

export async function getServerSideProps(context: any) {
    const session = await getSession({ req: context.req });
    if (!session) {
        return {
            redirect: {
                destination: context.query.callbackUrl || "/login",
                permenant: false,
            },
        };
    }
    return {
        props: {
            session,
        },
    };
}
