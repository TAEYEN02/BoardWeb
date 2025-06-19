import { AppBar, Button, Grid, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    const nevItems = [
        { name: "home", path: "/main" },
        { name: "board", path: "/board" },
        { name: "write", path: "/write" },
        { name: "my_Page", path: "/mypage" }
    ];

    const onhandleLogout = () => {
        window.location.href = '/';
        alert("로그아웃");
    }
    return (
        <AppBar position="static" sx={{ background: "#fff", boxShadow: 0.5, width: "100%" }}>
            <Toolbar sx={{ width: "95%" , mx:"auto"}}>
                <Grid container justifyContent="flex-end" spacing={6} alignItems="center" sx={{ width: "100%" }}>
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
                            sx={{ whiteSpace: "nowrap", color: "black", fontSize: "16px" }}
                        >
                            logout
                        </Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar >
    )
}
export default NavBar;
