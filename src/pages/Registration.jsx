import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/auth";
import { Navigate } from "react-router-dom";
import { Box, Button, Container, TextField, Typography } from "@mui/material";


export const Registration = () => {
    const dispatch = useDispatch();
    const { data } = useSelector(state => state.auth);
    const [register, setRegister] = useState({ email: '', password: '', fullName: '' });
    const sendLoginData = async (e) => {
        e.preventDefault();
        const data = await dispatch(registerUser(register));
        if (!data.payload) alert('registration operation failed');
        if ('token' in data.payload) {
            window.localStorage.setItem("token", data.payload.token);
        } else { alert('registration operation failed') }
        setRegister({ email: '', password: '', fullName: '' });
    };
    const hadleEmail = (e) => { setRegister(prev => ({ ...prev, email: e.target.value })) };
    const hadlePass = (e) => { setRegister(prev => ({ ...prev, password: e.target.value })) };
    const hadleName = (e) => { setRegister(prev => ({ ...prev, fullName: e.target.value })) };

    if (data) return <Navigate to='/' />;
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
                        id="name"
                        onChange={(e) => hadleName(e)}
                        value={register.fullName}
                        label="Name"
                        name="email"
                        autoComplete="email"
                        
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        onChange={(e) => hadleEmail(e)}
                        value={register.email}
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        value={register.password}
                        onChange={(e) => hadlePass(e)}
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
                        Sign Up
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};