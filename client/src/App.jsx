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
            <div className="Body-container grid mt-5">

            <div className='MarketOverview grid bg-black gap-4 rounded outline outline-1 outline-gray-500 justify-self-center w-[70vw] h-[20vh] p-4 ml-10 h-auto'>
                <div className="header">
                    <div className="text text-[1.5rem] font-bold h-auto">Market Overview</div>
                </div>
                    <div className="cards-container  grid grid-cols-1 justify-center sm:grid-cols-3 gap-4 text-center ml-1 h-auto">
                        <div className="card grid bg-[hsl(142,71%,25%)] rounded justify-start pl-3 font-bold text-[1.5rem]"><h1>S&P 500</h1> +1.2%</div>

                        <div className="card grid bg-[hsl(0,84%,25%)] rounded justify-start pl-3 font-bold text-[1.5rem]"><h1>NASDAQ</h1> -0.8%</div>
                        
                        <div className="card grid bg-[hsl(217,91%,25%)] rounded justify-start pl-3 font-bold text-[1.5rem]"><h1>Dow Jones</h1> +0.5%</div>
                    </div>
                
            </div>
            <div className="SearchContainer"></div>
            <div className="StocksContainer"></div>
            <div className="WachtList-Container"></div>
            </div>
        </main>
        </>
    )
}

export default App
