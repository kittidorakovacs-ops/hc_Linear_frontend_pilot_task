// src/page/board/style/boardButtons.style.ts
import { styled } from "@mui/material/styles";

/* ==========================================================================
   ALAP – boardos text gombok
   ========================================================================== */

const BoardTextButtonBase = styled("button")({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
  border: "none",
  cursor: "pointer",
  fontWeight: 500,
  fontSize: "0.85rem",
  borderRadius: 8,
  padding: "6px 12px",
  transition:
    "background-color 0.15s ease, color 0.15s ease, transform 0.1s ease",
});

/* ==========================================================================
   PRIMARY – Hozzáadás
   ========================================================================== */

export const BoardAddButton = styled(BoardTextButtonBase)({
  background: "var(--button-background-color)",
  color: "var(--text-color-light)",

  "&:hover:not(:disabled)": {
    background: "var(--button-background-color-hover)",
    color: "var(--text-color-dark)",
    transform: "translateY(-1px)",
    boxShadow: "0 0 10px rgba(27,226,154,0.25)",
  },

  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
    transform: "none",
    boxShadow: "none",
  },
});

/* ==========================================================================
   GHOST – Mégse
   ========================================================================== */

export const BoardCancelButton = styled(BoardTextButtonBase)({
  background: "rgba(255,255,255,0.12)",
  color: "var(--text-color-light)",

  "&:hover:not(:disabled)": {
    background: "rgba(255,255,255,0.25)",
    transform: "translateY(-1px)",
  },
});

/* ==========================================================================
   IKON ALAP – törlés + szerkesztés
   ========================================================================== */

const BoardIconButtonBase = styled("button")({
  width: 32,
  height: 32,
  border: "none",
  background: "transparent",
  borderRadius: 6,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition:
    "background-color 0.15s ease, color 0.15s ease, transform 0.1s ease",

  "& svg": {
    fontSize: 18,
  },
});

/* ==========================================================================
   TÖRLÉS IKON – sima ikon, piros hover
   ========================================================================== */

export const BoardDeleteIconButton = styled(BoardIconButtonBase)({
  color: "#ff5757",

  "&:hover": {
    background: "rgba(229,52,43,0.15)",
    color: "#ff2d2d",
    transform: "translateY(-1px)",
  },
});

/* ==========================================================================
   SZERKESZTÉS IKON – semleges
   ========================================================================== */

export const BoardEditIconButton = styled(BoardIconButtonBase)({
  color: "var(--text-color-light)",

  "&:hover": {
    background: "rgba(255,255,255,0.15)",
    color: "var(--primary-color)",
    transform: "translateY(-1px)",
  },
});
