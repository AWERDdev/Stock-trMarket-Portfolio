import {TrendingUp } from 'lucide-react' 
function Stock() {
    return (
        <div className="StockItem p-4  hover:bg-[hsl(0,0%,9%)] transition-colors">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                {/* Stock Info Section */}
                <div className="flex items-center space-x-8 w-1/3">
                    <h3 className="symbol font-medium">AppleInc.</h3>
                    <span className="name text-gray-400">AAPL</span>
                </div>
                
                {/* Price Info Section */}
                <div className="flex items-center justify-center space-x-8 w-1/3">
                    <div className="price">$187.64</div>
                    <div className="change text-green-500">+1.24%</div>
                    <div className="flex items-center text-green-500">
                        <TrendingUp className="w-4 h-4 mr-1"/>
                        <span className='volume'>64.2M</span>
                    </div>
                </div>
                
                {/* Action Button */}
                <div className="w-1/3 flex justify-end">
                    <button className="px-4 py-2  rounded-md   hover:bg-[hsl(0,0%,9%)] hover:outline-[hsl(0,0%,9%)] transition-colors">
                        Add to Watchlist
                    </button>
                </div>
            </div>
        </div>
    )
}


export default Stock
