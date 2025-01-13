import { BrowserRouter, Routes, Route } from "react-router";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import IntroPage from "./Pages/IntroPage.jsx";
import SignupPage from "./Pages/Signup.jsx";
import LoginPage from "./Pages/login.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>    
    <Routes>
      <Route path="/MainApp" element={<App />} />
      <Route path='/' element={<IntroPage />}/>
      <Route path='/signup' element={<SignupPage />}/>
      <Route path='/login' element={<LoginPage />}/>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
