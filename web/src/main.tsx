import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css'
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="auth" element={<Auth />}>
          <Route path='login' element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/account" element={<AccountLayout />}> 
          <Route path="agreements" element={<Agreements />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="disputes" element={<Disputes />} />   
          <Route path="settings" element={<Settings />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
        <Route path="/secure_payment" element={<SecurePayment />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
