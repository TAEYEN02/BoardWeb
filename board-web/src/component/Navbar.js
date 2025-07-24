import { AppBar, Button, Grid, Toolbar, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../api/userApi";

const NavBar = () => {
    const navigate = useNavigate();
    const nevItems = [
        { name: "home", path: "/main" },
        { name: "board", path: "/board" },
        { name: "write", path: "/write" },
        { name: "my_Page", path: "/mypage" }
    ];

    const onhandleLogout = () => {
        logout();
        window.location.replace('/');
    }
    return (
        <AppBar position="static" sx={{ background: "#fff", boxShadow: 0.5, width: "100%" }}>
            <Toolbar sx={{ width: "95%" , mx:"auto"}}>
                <Grid container justifyContent="space-between" alignItems="center" sx={{ width: "100%" }}>
                    <Grid item>
                        <NavLink to="/main" style={{ textDecoration: "none", color: "black" }}>
                            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                                Blog
                            </Typography>
                        </NavLink>
                    </Grid>
                    <Grid item>
                        <Grid container spacing={6} alignItems="center">
                            {nevItems.map((item) => (
                                <Grid item key={item.path}>
                                    <NavLink
                                        to={item.path}
                                        style={{ textDecoration: "none", color: "black" }}
                                    >
                                        <Typography variant="inherit">{item.name}</Typography>
                                    </NavLink>
                                </Grid>
                            ))}
                            <Grid item>
                                <Button
                                    onClick={onhandleLogout}
                                >
                                    logout
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar >
    )
}
export default NavBar;
