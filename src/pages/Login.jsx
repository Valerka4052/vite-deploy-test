import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/slices/auth";
import { Navigate } from "react-router-dom";
import { Box, Button,  Container, TextField, Typography } from "@mui/material";


export const Login = () => {
    const dispatch = useDispatch()
    const { data } = useSelector(state => state.auth);
    const [login, setLogin] = useState({ email: '', password: '' });
    
    const sendLoginData = async (e) => {
        e.preventDefault();
        const data = await dispatch(fetchUser(login));
        if (!data.payload) alert('login operation failed');
        if ('token' in data.payload) {
            window.localStorage.setItem("token", data.payload.token);
        } else { alert('login operation failed') }
        setLogin({ email: '', password: '' });
    };

    const hadleEmail = (e) => { setLogin(prev => ({ ...prev, email: e.target.value })) };
    const hadlePass = (e) => { setLogin(prev => ({ ...prev, password: e.target.value })) };
    
    if (data) return <Navigate to='/' />
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box component="form" onSubmit={sendLoginData} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        onChange={(e) => hadleEmail(e)}
                        value={login.email}
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        value={login.password} onChange={(e) => hadlePass(e)}
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};