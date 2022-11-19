import { Box, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import DarkModeFab from "../../lib/components/fab";

import TopAppBar from "../../lib/components/appbar";
export default function Admin_login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [logged, setLogged] = useState(false);
    const [token, setToken] = useState("");

    useEffect(() => {
        if (Boolean(localStorage.getItem("token"))) {
            setLogged(true);
            setToken(localStorage.getItem("token"));
        }
    }, []);

    function login() {
        if (username.length >= 4 && password.length >= 8) {
            // console.log(`username: ${username}, password:${password}`);
            fetch("/api/login/", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ username, password }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.token != "") setLogged(true);
                    setToken(data.token);
                    localStorage.setItem("token", data.token);
                    console.log(data);
                });
        } else {
            console.log("weird inputs");
        }
    }
    function logout() {
        if (logged) {
            fetch("api/logout/", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ token: localStorage.getItem("token") }),
            }).then(() => {
                window.location.reload();
            });
        }
        localStorage.removeItem("token");
    }

    const theme = useTheme();
    return (
        <Box height="100vh" sx={{ bgcolor: theme.palette.background.default }}>
            <TopAppBar />
            <DarkModeFab/>
            Logged in : {logged ? "True" : "False"} <br />
            Token: {token} <br />
            username:
            <input
                onBlur={(e) => {
                    setUsername(e.target.value);
                }}
                type="text"
            />
            <br />
            password:
            <input
                onBlur={(e) => {
                    setPassword(e.target.value);
                }}
                type="text"
            />
            <button onClick={login}>Login</button>
            <button onClick={logout}>Logout</button>
        </Box>
    );
}
