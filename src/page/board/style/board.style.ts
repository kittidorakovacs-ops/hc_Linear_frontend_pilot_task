// src/page/board/style/board.style.ts

import { styled } from "@mui/material/styles";
import { Box, Paper, Typography } from "@mui/material";
import {
  Page as TaskPage,
  Header as TaskHeader,
} from "../../task/style/task.style";


export const Page = styled(TaskPage)({
  minHeight: "100vh",
  padding: "64px 32px",
  background: "linear-gradient(145deg, var(--main-color), #062f41 60%)",
  color: "var(--text-color-light)",
  display: "flex",
  flexDirection: "column",
  gap: "40px",
});


export const Header = styled(TaskHeader)({
  width: "100%",
  maxWidth: 1120,
  margin: "0 auto 24px auto",
  textAlign: "center",
});

export const Title = styled(Typography)({
  fontWeight: 900,
  marginBottom: 8,
});

export const Subtitle = styled(Typography)({
  color: "var(--text-color-light)",
  fontSize: "1.05rem",
});


export const BoardCard = styled(Paper)({
  width: "100%",
  maxWidth: 1120,
  margin: "0 auto",
  borderRadius: 8,
  background: "rgba(255, 255, 255, 0.22)",
  padding: "20px 22px 24px",
  boxSizing: "border-box",
  backdropFilter: "blur(6px)",
  border: "1px solid rgba(255,255,255,0.05)",

  "@media (max-width: 900px)": {
    padding: "16px 14px 20px",
  },

  "@media (max-width: 600px)": {
    padding: "12px 10px 16px",
    borderRadius: 18,
  },
});


export const BoardHeaderRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16,
  gap: 16,

  "@media (max-width: 600px)": {
    alignItems: "flex-start",
    flexDirection: "column",
  },
});

export const BoardTitle = styled(Typography)({
  fontWeight: 600,
  fontSize: "1rem",
  color: "var(--text-color-light)",
});


export const ColumnsWrapper = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 16,

  "@media (max-width: 900px)": {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },

  "@media (max-width: 600px)": {
    gridTemplateColumns: "1fr",
  },
});


export const Column = styled("section")({
  display: "flex",
  flexDirection: "column",
  borderRadius: 18,
  padding: "12px 10px 12px",
  background: "rgba(6, 28, 40, 0.9)",
  border: "1px solid rgba(255,255,255,0.06)",
  minHeight: 220,
  maxHeight: 520,
  boxSizing: "border-box",
  overflow: "hidden",

  "@media (max-width: 600px)": {
    maxHeight: "unset",
  },
});


export const ColumnHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
  gap: 8,
});

export const ColumnTitle = styled(Typography)({
  fontSize: "0.9rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "var(--text-color-lighter)",
});

export const ColumnCounter = styled(Box)({
  minWidth: 32,
  padding: "3px 8px",
  borderRadius: 999,
  fontSize: "0.75rem",
  fontWeight: 600,
  textAlign: "center",
  background: "rgba(255,255,255,0.06)",
  color: "var(--text-color-light)",
});


export const ColumnBody = styled("div")({
  flex: 1,
  marginTop: 4,
  padding: "6px 2px 4px",
  overflowY: "auto",
  scrollbarWidth: "thin",

  "&::-webkit-scrollbar": {
    width: 6,
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "var(--scrollbar-color)",
    borderRadius: 999,
  },
});


export const ColumnFooter = styled("div")({
  marginTop: 8,
});
