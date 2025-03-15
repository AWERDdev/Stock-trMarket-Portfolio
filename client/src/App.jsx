import './App.css'
import NavBar from "./components/NavBar"
import NavBarNoAUTH from './components/NavBarNoAUTH'
import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import INFOBar from './components/INFOBar'
import Stock from './components/Stock'
import StockWatchList from './components/StockWatchList'
import { API_BASE_URL } from './config'

function App() {
    const [isAUTH, setisAUTH] = useState(false);
    const [StockData,setStockData] = useState([])
    const [filteredStockData, setFilteredStockData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [watchlist, setWatchlist] = useState([]);

    const handleLogout = async () => {
        localStorage.removeItem('token');
        // console.log("Token removed from localStorage");
        // console.log("User logged out");
        setisAUTH(false);
        window.location.href = '/';
    };
    console.log(API_BASE_URL)
    const HandleNavBar = async () => {
        console.log("Current token:", localStorage.getItem('token'));
        const response = await fetch(`${API_BASE_URL}/isAUTH`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
         const data = await response.json();
        // console.log("Auth Response:", data);
        // console.log("Auth Status:", data.AUTH);
        setisAUTH(data.AUTH);
    }

    const ReciveStock = async () => {
        const response = await fetch(`${API_BASE_URL}/Stock`);
        const data = await response.json();
        console.log('Received data type:', typeof data, Array.isArray(data));
        if (!Array.isArray(data)) {
            console.error('Expected array but got:', data);
            return [];
        }
        setStockData(data);
        setFilteredStockData(data);
    }
    

const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    
    const filtered = StockData.filter(stock => 
        stock.name.toLowerCase().includes(value.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredStockData(filtered);
}
    const addToWatchlist = (stock) => {
    if (!watchlist.some(item => item.symbol === stock.symbol)) {
        setWatchlist([...watchlist, stock]);
        console.log(`Added ${stock.name} to watchlist`);
    }
    };
    const RemovefromWatchlist = (stock) => {
        const updatedWatchlist = watchlist.filter(item => item.symbol !== stock.symbol);
        setWatchlist(updatedWatchlist);
        console.log(`Removed ${stock.name} from watchlist`);
    };
        
    useEffect(() => {

        HandleNavBar();
        ReciveStock();
    }, []);
    
    console.log('Current API_BASE_URL:', API_BASE_URL);
    console.log('Current route:', window.location.pathname);


    return (
        <main className="h-[100%] w-screen text-[#ffffff] dark:bg-gray-900 ">
            {isAUTH ? <NavBarNoAUTH handleLogout={handleLogout} /> : <NavBar />}

            <div className="Body-container grid gap-5 mt-5 h-[100%]">
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
                            onChange={handleSearch}
                            value={searchValue}
                            
                        />
                        <button><Search className="absolute left-4 top-1/3 transform -translate-y-1/2 text-gray-400 hover:text-gray-300" /></button>
                    </div>
                </div>

                <div className="StocksContainer  gird justify-self-center bg-[hsl(0,0%,3%)] rounded-md w-[90vw] h-full outline outline-1 outline-gray-600  max-w-7xl mx-auto shadow-lg">
                    <div className="text ml-[2rem]">
                        <h1 className='text-[1.5rem] font-bold'>Stock Data</h1>
                    </div>
                    <div className="flex flex-col w-full"> 
                        <div className="INfo-Stocks">
                            <INFOBar/>
                        </div>
                        <div className="Stock-Container "> 
                        {filteredStockData.map((stock, index) => (
    <Stock 
        key={index}
        stockData={stock}
        addToWatchlist={addToWatchlist}
    />
))}
                        </div>
                       
                    </div>
                </div>

                <div className="WachtList-Container gird gap-[20rem] justify-self-center bg-[hsl(0,0%,3%)] rounded-md w-[90vw] h-[100%] outline outline-1 outline-gray-600 max-w-7xl mx-auto  shadow-lg">
                    <div className="text ml-[2rem]">
                        <h1 className='text-[1.5rem] font-bold'>Your Watchlist</h1>
                    </div>
                    <div className="INfo-Stocks">
                            <INFOBar/>
                        </div>
                        <div className="stock-container">
                            {watchlist.map((stock, index) => (
    <StockWatchList
        key={index}
        stockData={stock}
        RemovefromWatchlist={RemovefromWatchlist}
    />
))}
                        </div>
                </div>
            </div>
        </main>
    )
}

export default App
