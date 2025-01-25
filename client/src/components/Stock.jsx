import {TrendingUp } from 'lucide-react' 
function Stock() {
    return (
        <div className="StockItem  mt-3 ml-[1.5rem] flex gap-[5rem]">
            <div className="stock-title w-[20vw] flex gap-[5rem]">
                <h3 className="name">AppleInc.</h3>
                <span className="symbol">AAPL</span>
            </div>
            <div className="stock-details  flex gap-[5rem] ml-[16rem]">
                <div className="price">$187.64</div>
                <div className="change positive">+1.24%</div>
                <div className="volume flex text-[#22c55e] "><TrendingUp/>64.2M</div>
            </div>
            <div className="AddtoWatchList-BTN w-[20vw]">
                <button>Add to Watchlist</button>
            </div>
        </div>
    )
}

export default Stock
