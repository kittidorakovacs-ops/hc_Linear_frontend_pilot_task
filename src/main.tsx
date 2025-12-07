import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./config/queryClient.config.ts";
import App from "./App.tsx";
import { ToastProvider } from "./component/ui/toast/ToastProvider";


createRoot(document.getElementById('root')!).render(
<StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </QueryClientProvider>
  </StrictMode>,
)


