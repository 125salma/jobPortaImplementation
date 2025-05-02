import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  RouterProvider,
} from "react-router-dom";
import Router from './Router/Router';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import AuthProvider from './context/AuthContext/AuthProvider';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <HelmetProvider>
    <RouterProvider router={Router} />
    </HelmetProvider>
    </AuthProvider>
 
  </StrictMode>,
)
