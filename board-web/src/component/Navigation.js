import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import { Link, useLocation } from "react-router-dom"

const Navigation = () => {

    const location = useLocation();

    const menuItems = [
        { text: "전체 글", to: "/allpage" },
        { text: "글쓰기", to: "/write" },
        { text: "검색", to: "/search" },
        { text: "My Page", to: "/mypage" }
    ];

    return (
        <Box
            sx={{
                width: "100%",
                height: "30vh",
                bgcolor: "#f9f9f9",
                borderRight: "1px solid #ddd",
                display: "grid",
            }}
        >
            <Box sx={{ flexGrow: 1 }}>
                <Typography
                    variant="h6"
                    sx={{ m: 2, fontWeight: "bold", fontSize: "18px" }}
                >Board Web</Typography>
                {menuItems.map(({ text, to }) => (
                    <ListItem key={to} disablePadding>
                        <ListItemButton
                            LinkComponent={Link}
                            to={to}
                            selected={location.pathname === to}
                            sx={{
                                "&:hover": {
                                    backgroundColor: "#f1f1f1",
                                }
                            }}
                        >
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </Box>
        </Box>
    )
}
export default Navigation