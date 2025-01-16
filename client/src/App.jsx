import './App.css'
import NavBar from "./components/NavBar"
import NavBarNoAUTH from './components/NavBarNoAUTH'
import { useState, useEffect } from 'react'

function App() {
    const [isAUTH, setisAUTH] = useState(false);
    const handleLogout = async () => {
      localStorage.removeItem('token');
      console.log("Token removed from localStorage");
      console.log("User logged out");
      setisAUTH(false);
      // Optionally redirect to login page or home page
      window.location.href = '/';
  };

    const HandleNavBar = async () => {
      console.log("Current token:", localStorage.getItem('token')); // Check if token exists
    
    const response = await fetch('http://localhost:3500/isAUTH', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    const data = await response.json();
    console.log("Auth Response:", data); // See full response
    console.log("Auth Status:", data.AUTH); // See specific AUTH value
    setisAUTH(data.AUTH);
    }

    useEffect(() => {
        HandleNavBar();
    }, []);

    return (
        <>
            <main className="h-screen w-screen text-[#ffffff] dark:bg-gray-900">
                {isAUTH ? <NavBarNoAUTH handleLogout={handleLogout} /> :<NavBar /> }
                {/* Body content */}
                <div>
                </div>
            </main>
        </>
    )
}

export default App
