import {styled} from "@mui/material/styles";
import {Box, Paper, Typography} from "@mui/material";

export const Page = styled(Box)({
    minHeight: "100vh",
    padding: "64px 32px",
    background: "linear-gradient(145deg, var(--main-color), #062f41 60%)",
    color: "var(--text-color-light)",
    display: "flex",
    flexDirection: "column",
    gap: "40px",
});

export const Header = styled(Box)({
    textAlign: "center",
    marginBottom: "16px",
});

export const Card = styled(Paper)({
    padding: "32px",
    borderRadius: "22px",
    background: "rgba(255,255,255,0.03)",
    backdropFilter: "blur(6px)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
    transition: "0.25s ease",
    "&:hover": {
        borderColor: "var(--primary-color)",
        boxShadow: "0 0 16px rgba(27,226,154,0.35)",
        transform: "translateY(-3px)",
    },
});

export const Title = styled(Typography)({
    fontWeight: 700,
    color: "var(--primary-color)",
    letterSpacing: ".5px",
    marginBottom: "4px",
});

export const Subtitle = styled(Typography)({
    color: "var(--text-color-lighter)",
    marginTop: "8px",
    fontSize: "1.1rem",
});

export const CodeBlock = styled("pre")({
    background: "rgba(0,0,0,0.35)",
    padding: "20px",
    borderRadius: "12px",
    color: "#cfe8ff",
    overflowX: "auto",
    marginTop: "16px",
    border: "1px solid rgba(255,255,255,0.1)",
});

export const Logo = styled("img")({
    width: "180px",
    height: "auto",
    margin: "0 auto",
    display: "block",
    marginBottom: "24px",
    filter: "drop-shadow(0 0 6px rgba(27,226,154,0.35))",
});
