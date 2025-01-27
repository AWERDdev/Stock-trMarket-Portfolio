import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import IntroPage from "./Pages/IntroPage.jsx";
import SignupPage from "./Pages/Signup.jsx";
import LoginPage from "./Pages/login.jsx";
import { API_BASE_URL } from './config'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>    
    <Routes>
      <Route path="/MainApp" element={<App />} />
      <Route path='/' element={<IntroPage />}/>
      <Route path='/signup' element={<SignupPage />}/>
      <Route path='/login' element={<LoginPage />}/>
      {/* Debug route goes here */}
      <Route 
        path="*" 
        element={
          <div>
            <h1>Debug Info</h1>
            <pre>
              {JSON.stringify({
                currentPath: window.location.pathname,
                apiUrl: API_BASE_URL,
                environment: import.meta.env.PROD ? 'Production' : 'Development'
              }, null, 2)}
            </pre>
          </div>
        } 
      />
    </Routes>
    </BrowserRouter>
  </StrictMode>
)
