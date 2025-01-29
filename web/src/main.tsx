import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css'
import App from './App.tsx'
import SecurePayment from './secure_payment/index.tsx';
import Auth from './auth/index.tsx';
import Login from './auth/login.tsx';
import Register from './auth/register.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="auth" element={<Auth />}>
          <Route path='login' element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/secure_payment" element={<SecurePayment />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
