// src/page/bus/style/busEdit.style.ts
import { styled } from "@mui/material/styles";
import { Box, Paper, Typography } from "@mui/material";

export const Page = styled(Box)({
  minHeight: "100vh",
  padding: "64px 16px",
  background: "linear-gradient(145deg, var(--main-color), #062f41 60%)",
  color: "var(--text-color-light)",
  display: "flex",
  flexDirection: "column",
  gap: "40px",
});

export const Header = styled(Box)({
  width: "100%",
  maxWidth: 1120,
  margin: "0 auto 16px auto",
  textAlign: "center",
});

export const Title = styled(Typography)({
  fontWeight: 900,
  marginBottom: "8px",
});

export const Subtitle = styled(Typography)({
  color: "var(--text-color-lighter)",
  fontSize: "1rem",
});

export const Card = styled(Paper)({
  width: "100%",
  maxWidth: 720,
  margin: "0 auto",
  borderRadius: 22,
  background: "rgba(255,255,255,0.02)",
  border: "1px solid rgba(255,255,255,0.03)",
  boxShadow: "none",
  padding: "24px 32px",
  boxSizing: "border-box",
});

export const CardHeader = styled(Box)({
  marginBottom: 20,
});

export const CardTitle = styled(Typography)({
  fontWeight: 700,
  fontSize: "1.2rem",
  color: "var(--primary-color)",
});

export const CardSubtitle = styled(Typography)({
  fontSize: "0.9rem",
  color: "var(--text-color-lighter)",
  marginTop: 4,
});

export const FormFooter = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 20,
});

export const LeftActions = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 10,
});

export const SaveButton = styled("button")({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  background: "var(--button-background-color)",
  color: "var(--text-color-light)",
  padding: "10px 18px",
  borderRadius: 999,
  border: "none",
  fontWeight: 600,
  fontSize: "0.95rem",
  cursor: "pointer",
  transition:
    "background-color 0.2s ease, box-shadow 0.2s ease, transform 0.1s ease",
  "& svg": {
    fontSize: 18,
  },
  "&:hover:not(:disabled)": {
    background: "var(--button-background-color-hover)",
    color: "var(--text-color-dark)",
    boxShadow: "0 0 16px rgba(27, 226, 154, 0.5)",
    transform: "translateY(-1px)",
  },
  "&:disabled": {
    opacity: 0.7,
    cursor: "default",
  },
  "@media (max-width: 600px)": {
    padding: 8,
    minWidth: 40,
    justifyContent: "center",
    "& span": {
      display: "none",
    },
  },
});

export const DeleteButton = styled("button")({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  background: "rgba(229, 52, 43, 0.15)",
  color: "var(--cancel-delete-button-color)",
  padding: "8px 14px",
  borderRadius: 999,
  border: "1px solid rgba(229, 52, 43, 0.4)",
  fontWeight: 500,
  fontSize: "0.9rem",
  cursor: "pointer",
  transition:
    "background-color 0.2s ease, box-shadow 0.2s ease, transform 0.1s ease",
  "& svg": {
    fontSize: 18,
  },
  "&:hover": {
    background: "rgba(229, 52, 43, 0.3)",
    color: "#ffffff",
    boxShadow: "0 0 14px rgba(229, 52, 43, 0.5)",
    transform: "translateY(-1px)",
  },
  "@media (max-width: 600px)": {
    padding: 8,
    minWidth: 40,
    justifyContent: "center",
    "& span": {
      display: "none",
    },
  },
});
