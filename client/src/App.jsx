import './App.css'
import NavBar from "./components/NavBar"
import NavBarNoAUTH from './components/NavBarNoAUTH'
import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import INFOBar from './components/INFOBar'
import Stock from './components/Stock'

function App() {
    const [isAUTH, setisAUTH] = useState(false);

    const handleLogout = async () => {
        localStorage.removeItem('token');
        console.log("Token removed from localStorage");
        console.log("User logged out");
        setisAUTH(false);
        window.location.href = '/';
    };

    const HandleNavBar = async () => {
        console.log("Current token:", localStorage.getItem('token'));
        const response = await fetch('http://localhost:3500/isAUTH', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const data = await response.json();
        console.log("Auth Response:", data);
        console.log("Auth Status:", data.AUTH);
        setisAUTH(data.AUTH);
    }

    useEffect(() => {
        HandleNavBar();
    }, []);

    return (
        <main className="h-screen w-screen text-[#ffffff] dark:bg-gray-900">
            {isAUTH ? <NavBarNoAUTH handleLogout={handleLogout} /> : <NavBar />}

            <div className="Body-container grid gap-5 mt-5">
                <div className='MarketOverview grid bg-[hsl(0,0%,3%)] gap-4 rounded outline outline-1 outline-gray-500 justify-self-center w-[70vw] h-[auto] p-4 ml-10'>
                    <div className="header">
                        <div className="text text-[1.5rem] font-bold h-auto">Market Overview</div>
                    </div>
                    <div className="cards-container grid grid-cols-1 justify-center sm:grid-cols-3 gap-4 text-center ml-1 h-auto">
                        <div className="card grid bg-[hsl(142,71%,25%)] rounded justify-start pl-3 font-bold text-[1.5rem]">
                            <h1>S&P 500</h1> +1.2%
                        </div>
                        <div className="card grid bg-[hsl(0,84%,25%)] rounded justify-start pl-3 font-bold text-[1.5rem]">
                            <h1>NASDAQ</h1> -0.8%
                        </div>
                        <div className="card grid bg-[hsl(217,91%,25%)] rounded justify-start pl-3 font-bold text-[1.5rem]">
                            <h1>Dow Jones</h1> +0.5%
                        </div>
                    </div>
                </div>

                <div className="SearchContainer mt-[5rem] flex relative ml-[4rem]">
                    <div className="relative w-[20vw]">
                        <input
                            type="text"
                            placeholder='Search Stocks...'
                            className="Search-Bar bg-[hsl(0,0%,3%)] rounded-md ml-2 p-2 w-[25vw] min-w-[300px] pl-10 focus:outline outline-1 outline-white"
                        />
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                <div className="StocksContainer gird justify-self-center bg-[hsl(0,0%,3%)] rounded-md w-[90vw] h-full outline outline-1 outline-gray-600">
                    <div className="text ml-[2rem]">
                        <h1 className='text-[1.5rem] font-bold'>Stock Data</h1>
                    </div>
                    <div className="flex flex-col w-full"> 
                        <div className="INfo-Stocks">
                            <INFOBar/>
                        </div>
                        <div className="Stock-Container "> 
                            <Stock/>
                        </div>
                       
                    </div>
                </div>

                <div className="WachtList-Container gird gap-[20rem] justify-self-center bg-[hsl(0,0%,3%)] rounded-md w-[90vw] h-full outline outline-1 outline-gray-600">
                    <div className="text ml-[2rem]">
                        <h1 className='text-[1.5rem] font-bold'>Your Watchlist</h1>
                    </div>
                    <INFOBar/>
                </div>
            </div>
        </main>
    )
}

export default App
