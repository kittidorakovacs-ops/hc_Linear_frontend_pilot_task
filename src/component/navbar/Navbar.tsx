import {useLocation} from "react-router-dom";
import {Box, Toolbar} from "@mui/material";
import {Logo, NavBar, NavButton} from "./style/navbar.style";
import {menuItems} from "./data/menuItems.data";

export default function Navbar() {
    const {pathname} = useLocation();

    return (
        <NavBar position="sticky" elevation={0}>
            <Toolbar sx={{display: "flex", alignItems: "center"}}>
                <Logo src="/hcl-logo.svg" alt="HC Linear"/>

                <Box sx={{display: "flex", gap: "12px"}}>
                    {menuItems.map((item) => (
                        <NavButton
                            key={item.path}
                            to={{pathname: item.path}}
                            className={pathname === item.path ? "active" : ""}
                        >
                            {item.label}
                        </NavButton>
                    ))}
                </Box>
            </Toolbar>
        </NavBar>
    );
}
