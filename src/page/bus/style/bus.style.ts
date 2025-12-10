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
  fontSize: "1.1rem",
});

export const Card = styled(Paper)({
  width: "100%",
  maxWidth: 1120,
  margin: "0 auto",
  borderRadius: "var(--button-border-radius)",
  background: "rgba(255,255,255,0)",
  boxShadow: "none",
  padding: "20px 24px 24px",
  boxSizing: "border-box",

  "@media (max-width: 600px)": {
    padding: "12px 0px 14px",
  },
});

export const CardHeaderRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 12,
});

export const CardTitle = styled(Typography)({
  fontWeight: 600,
  fontSize: "1rem",
  color: "var(--text-color-light)",
});

export const TableWrapper = styled("div")({
  marginTop: 20,
  borderRadius: "var(--button-border-radius)",
  overflow: "hidden",
  border: "1px solid var(--main-color)",

  "@media (max-width: 1024px)": {
    border: "none",
  },
});

export const Table = styled("table")({
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: 0,
  tableLayout: "fixed", 

  "& th": {
    padding: "15px 16px",
    textAlign: "left",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "var(--text-color-lighter)",
    borderBottom: "1px solid var(--main-color)",
    backgroundColor: "rgba(21, 98, 131, 0.3)",
  },

  "& th.bus-cell-right": {
    textAlign: "right",
  },

  "& th.bus-cell-center": {
    textAlign: "center",
  },

  "& td.bus-cell-right": {
    textAlign: "right",
  },

  "& td.bus-cell-center": {
    textAlign: "center",
  },

  "& tbody tr td": {
    padding: "12px 16px",
    fontSize: "0.9rem",
    borderBottom: "1px dashed var(--main-color)",
    color: "#fff",
  },

  "& tbody tr:last-of-type td": {
    borderBottom: "none",
  },

  "& tbody tr:hover": {
    background: "rgba(0,0,0,0.12)",
  },

  "@media (max-width: 1024px)": {
    borderCollapse: "separate",
    borderSpacing: "0 16px",

    "& thead": {
      display: "none",
    },

    "& tbody tr": {
      display: "block",
      padding: "24px",
      borderRadius: 22,
      background: "rgba(255,255,255,0.03)",
      backdropFilter: "blur(6px)",
      border: "1px solid rgba(255,255,255,0.08)",
      transition: "0.25s ease",
      overflow: "hidden",
      margin: "20px 0",

      "&:hover": {
        borderColor: "var(--primary-color)",
        boxShadow: "0 0 16px rgba(27,226,154,0.35)",
        transform: "translateY(-3px)",
      },
    },

    "& tbody tr td": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px dashed var(--main-color-30)",
      padding: "6px 0",
      fontSize: "0.9rem",
    },

      "& tbody tr td .bus-cell-value": {
        marginLeft: "auto",
        textAlign: "right",
      },

    "& tbody tr td::before": {
      content: "attr(data-label)",
      fontSize: "0.75rem",
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      color: "var(--text-color-lighter)",
      marginRight: 8,
    },

    "& tbody tr td:last-of-type": {
      borderBottom: "none",
      paddingTop: 8,
    },
  },
});

/** MODELL OSZLOP – hosszú szöveg ellipsis-szel desktopon */
export const ModelCell = styled("td")({
  maxWidth: 260,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",

  "@media (max-width: 1024px)": {
    maxWidth: "100%",
    whiteSpace: "normal",
    overflow: "visible",
    textOverflow: "clip",
    wordBreak: "break-word",
  },
});

export const CellRight = styled("td")({
  textAlign: "right",
});

export const ActionsCell = styled("td")({
  textAlign: "center",
});

export const Actions = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 8,
});
