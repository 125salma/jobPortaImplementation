import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  RouterProvider,
} from "react-router-dom";
import Router from './Router/Router';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import AuthProvider from './context/AuthContext/AuthProvider';
//tanstack query 
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <RouterProvider router={Router} />
        </HelmetProvider>
      </QueryClientProvider>

    </AuthProvider>

  </StrictMode>,
)
