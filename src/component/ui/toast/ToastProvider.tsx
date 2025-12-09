import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert, { type AlertColor } from "@mui/material/Alert";

export type ToastVariant = "success" | "error" | "warning" | "info";

export interface ToastOptions {
  message: string;
  variant?: ToastVariant;
}

interface ToastState {
  open: boolean;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  showToast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = useCallback(({ message, variant = "info" }: ToastOptions) => {
    setToast({
      open: true,
      message,
      variant,
    });
  }, []);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;

    setToast((prev) => (prev ? { ...prev, open: false } : prev));
  };

  const isOpen = !!toast?.open;
  const severity: AlertColor = (toast?.variant || "info") as AlertColor;

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <Snackbar
          open={isOpen}
          autoHideDuration={3500}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity={severity}
            variant="filled"
            sx={{
              width: "100%",
              bgcolor:
                severity === "success"
                  ? "rgba(27, 226, 154, 0.15)"
                  : severity === "error"
                  ? "rgba(229, 52, 43, 0.15)"
                  : "rgba(6, 47, 65, 0.9)",
              color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(6px)",
            }}
          >
            {toast.message}
          </Alert>
        </Snackbar>

      )}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);

  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return ctx;
}
