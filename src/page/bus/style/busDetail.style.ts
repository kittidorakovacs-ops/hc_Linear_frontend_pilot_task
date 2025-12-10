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

export const CardTitle = styled(Typography)({
  fontWeight: 700,
  fontSize: "1.2rem",
  color: "var(--primary-color)",
});

export const CardHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
});

export const DetailsWrapper = styled("dl")({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

export const DetailRow = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  padding: "12px 0",
  borderBottom: "1px dashed rgba(255,255,255,0.12)",
});

export const DetailLabel = styled("dt")({
  fontSize: "0.9rem",
  color: "var(--text-color-lighter)",
});

export const DetailValue = styled("dd")({
  margin: 0,
  fontSize: "1rem",
  fontWeight: 500,
  textAlign: "right",
  color: "var(--text-color-light)",
});
