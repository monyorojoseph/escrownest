import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer } from 'react-toastify';
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import App from './App.tsx'
import SecurePayment from './secure_payment/index.tsx';
import Auth from './auth/index.tsx';
import Login from './auth/login.tsx';
import Register from './auth/register.tsx';
import AccountLayout from './account/index.tsx';
import Settings from './account/settings/index.tsx';
import Notifications from './account/notifications/index.tsx';
import Transactions from './account/transactions/index.tsx';
import Agreements from './account/agreements/index.tsx';
import Disputes from './account/disputes/index.tsx';
import Layout from './components/Layout.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import axiosInstance from './services/axios.ts';
import EmailVerificationWaiting from './verification/email.tsx';
import EmailVerification from './verification/verifiy_email.tsx';
import GoogleCallback from './linking_accounts/google_callback.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import NewAgreement from './secure_payment/new.tsx';
import ActivateAgreement from './secure_payment/activate.tsx';


axiosInstance

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
      <GoogleOAuthProvider 
        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <AuthProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<App />} />
                <Route path="auth" element={<Auth />}>
                  <Route path='login' element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="email_verification/:uid/:token"  element={<EmailVerification />} />
                </Route>

                <Route path="verification/verify_email/:uid/:token"  element={<EmailVerification />} />
                <Route path="verification/email/"  element={<EmailVerificationWaiting />} />

                <Route path="linking_accounts/google_callback/:token/:context"  element={<GoogleCallback />} />

                <Route path="/account" element={<AccountLayout />}> 
                  <Route path="agreements" element={<Agreements />} />
                  <Route path="transactions" element={<Transactions />} />
                  <Route path="disputes" element={<Disputes />} />   
                  <Route path="settings" element={<Settings />} />
                  <Route path="notifications" element={<Notifications />} />
                </Route>
                <Route path="/secure_payment" element={<SecurePayment />} >
                  <Route path="new" element={<NewAgreement />} />
                  <Route path="activate" element={<ActivateAgreement />} />
                </Route>
              </Route>
            </Routes>
            <ToastContainer />
        </AuthProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
)
