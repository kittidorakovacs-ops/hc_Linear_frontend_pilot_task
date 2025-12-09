// src/page/bus/style/busButtons.style.ts
import { styled } from "@mui/material/styles";

/* ==========================================================================
   ALAP – minden busos text button erre épül
   ========================================================================== */

const BusTextButtonBase = styled("button")({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
  border: "none",
  borderRadius: "var(--button-border-radius)",
  fontWeight: 500,
  fontSize: "0.9rem",
  cursor: "pointer",
  transition:
    "background-color 0.2s ease, box-shadow 0.2s ease, transform 0.1s ease",
  "& svg": {
    fontSize: 18,
  },
  "&:disabled": {
    opacity: 0.7,
    cursor: "not-allowed",
    boxShadow: "none",
    transform: "none",
  },
});

/* ==========================================================================
   LISTAOLDALI CTA – "Új busz" (figyelemfelhívó, zöldes)
   ========================================================================== */

export const BusListCtaButton = styled(BusTextButtonBase)({
  padding: "10px 18px",
  fontSize: "0.95rem",
  fontWeight: 600,
  color: "var(--primary-color)",
  background: "rgba(27, 226, 154, 0.15)",
  border: "1px solid rgba(27, 226, 154, 0.35)",

  "&:hover:not(:disabled)": {
    background: "var(--primary-color)",
    boxShadow: "0 0 10px rgba(27, 226, 154, 0.35)",
    color: "var(--text-color-dark)",
    transform: "translateY(-1px)",
  },

  "& span": {
    marginTop: 1,
  },

  "@media (max-width: 600px)": {
    padding: 10,
    minWidth: 44,
    justifyContent: "center",
    "& span": {
      display: "none",
    },
  },
});

/* ==========================================================================
   PRIMARY – "Mentés" (BusEdit, erősebb CTA)
   ========================================================================== */

export const BusPrimaryButton = styled(BusTextButtonBase)({
  padding: "10px 18px",
  fontSize: "0.95rem",
  fontWeight: 600,
  background: "var(--button-background-color)",
  color: "var(--text-color-light)",

  "&:hover:not(:disabled)": {
    background: "var(--button-background-color-hover)",
    color: "var(--text-color-dark)",
    boxShadow: "0 0 16px rgba(27, 226, 154, 0.5)",
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

/* ==========================================================================
   PRIMARY SMALL – modal submit ("Busz hozzáadása")
   ========================================================================== */

export const BusPrimarySmallButton = styled(BusTextButtonBase)({
  padding: "8px 14px",
  fontSize: "0.85rem",
  background: "var(--button-background-color)",
  color: "var(--text-color-light)",

  "&:hover:not(:disabled)": {
    background: "var(--button-background-color-hover)",
    color: "var(--text-color-dark)",
    boxShadow: "0 0 12px rgba(27, 226, 154, 0.45)",
    transform: "translateY(-1px)",
  },
});

/* ==========================================================================
   DANGER TEXT GOMB – Edit oldali törlés
   ========================================================================== */

export const BusDangerButton = styled(BusTextButtonBase)({
  padding: "8px 14px",
  fontSize: "0.9rem",
  fontWeight: 500,
  background: "rgba(229, 52, 43, 0.15)",
  color: "var(--cancel-delete-button-color)",
  border: "1px solid rgba(229, 52, 43, 0.4)",

  "&:hover:not(:disabled)": {
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

/* ==========================================================================
   GHOST / BACK – "Mégse"
   ========================================================================== */

export const BusBackButton = styled(BusTextButtonBase)({
  padding: "8px 14px",
  background: "rgba(255, 255, 255, 0.08)",
  color: "var(--text-color-light)",
  borderRadius: "var(--button-border-radius)",
  border: "1px solid rgba(255,255,255,0.12)",

  "&:hover:not(:disabled)": {
    background: "rgba(255, 255, 255, 0.16)",
    boxShadow: "0 0 10px rgba(255,255,255,0.25)",
    transform: "translateY(-1px)",
  },

  "@media (max-width: 600px)": {
    padding: 8,
    minWidth: 40,
    "& span": {
      display: "none",
    },
  },
});

/* ==========================================================================
   IKON BUTTON ALAP – táblázati műveletekhez
   ========================================================================== */

const BusIconButtonBase = styled("button")({
  width: 34,
  height: 34,
  borderRadius: "var(--button-border-radius)",
  border: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition:
    "background-color 0.2s ease, box-shadow 0.2s ease, transform 0.1s ease",
  "& svg": {
    fontSize: 18,
  },
});

/* VIEW ICON – kék */
export const BusIconView = styled(BusIconButtonBase)({
  background: "rgba(59, 130, 246, 0.12)",
  color: "#3b82f6",

  "&:hover": {
    background: "rgba(59, 130, 246, 0.25)",
    boxShadow: "0 0 10px rgba(59,130,246,0.35)",
    transform: "translateY(-1px)",
  },
});

/* EDIT ICON – fehéres */
export const BusIconEdit = styled(BusIconButtonBase)({
  background: "rgba(255,255,255,0.12)",
  color: "var(--text-color-light)",

  "&:hover": {
    background: "rgba(255,255,255,0.24)",
    boxShadow: "0 0 10px rgba(255,255,255,0.35)",
    transform: "translateY(-1px)",
  },
});

/* DELETE ICON – piros */
export const BusIconDelete = styled(BusIconButtonBase)({
  background: "rgba(229, 52, 43, 0.15)",
  color: "var(--cancel-delete-button-color)",
  border: "1px solid rgba(229, 52, 43, 0.4)",

  "&:hover": {
    background: "rgba(229, 52, 43, 0.3)",
    color: "#ffffff",
    boxShadow: "0 0 14px rgba(229, 52, 43, 0.5)",
    transform: "translateY(-1px)",
  },
});
