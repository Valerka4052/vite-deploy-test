// import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {Link as RouterLink, useNavigate } from "react-router-dom"
import { logout } from "../redux/slices/auth";
import Button from '@mui/material/Button';
import { AppBar, Box, Toolbar, Typography } from "@mui/material/";

export const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { data } = useSelector(state => state.auth);
    const handleAuth = () => {
        window.localStorage.removeItem("token");
        dispatch(logout());
        navigate('/');
    };
  
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Button variant="outlined" component={RouterLink} to='/'
                        size="large"
                        edge="start"
                        color="inherit"
                        // aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        Posts
                    </Button >
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {data !== null ? (data.fullName !== null ? `${data.fullName}` : "user") : "welcome to posts"}
                    </Typography>
                    {data === null ?
                        <>
                            <Button color="inherit" component={RouterLink} to='/login' variant="outlined" sx={{ marginRight: '8px' }}>Login</Button>
                            <Button color="inherit" component={RouterLink} to='/register' variant="outlined" >Register</Button>
                        </>
                        :
                        <>
                            <Button color="inherit" component={RouterLink} to='/add-post' variant="outlined" sx={{ marginRight: '8px' }}>Create post</Button>
                            <Button color="inherit" onClick={handleAuth} variant="outlined" sx={{ backgroundColor: 'red' }} >Logout</Button>
                        </>}
                </Toolbar>
            </AppBar>
        </Box>
    );
};