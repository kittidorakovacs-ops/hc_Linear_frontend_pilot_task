import {styled} from "@mui/material/styles";
import {AppBar} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";

export const NavBar = styled(AppBar)({
    background: "rgba(0,0,0,0.25)",
    backdropFilter: "blur(8px)",
    boxShadow: "0 4px 18px rgba(0,0,0,0.4)",
    padding: "6px 0",
});

export const Logo = styled("img")({
    width: 140,
    marginRight: 24,
    filter: "drop-shadow(0 0 6px rgba(27,226,154,0.35))",
});

export const NavButton = styled(RouterLink)(() => ({
    color: "var(--text-color-light)",
    textTransform: "none",
    fontWeight: 600,
    fontSize: "1rem",
    letterSpacing: ".3px",
    transition: ".25s ease",
    "&.active": {
        color: "var(--primary-color)",
        textShadow: "0 0 8px rgba(27,226,154,0.4)",
    },
    "&:hover": {
        color: "var(--primary-color)",
    },
}));
