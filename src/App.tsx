import './global.css'

import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner'


import { router } from './routes';
import {ThemeProvider} from "@/components/theme/theme-provider.tsx";

export function App() {

  return (
    <HelmetProvider>
        <ThemeProvider storageKey="pizzashop-theme" defaultTheme="dark">
            <Helmet titleTemplate="%s | Pizzashop" />
            <Toaster />
            <RouterProvider router={router} />
        </ThemeProvider>

    </HelmetProvider>

  )
}
