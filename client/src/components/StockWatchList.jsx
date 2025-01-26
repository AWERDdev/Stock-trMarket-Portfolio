import { TrendingUp, TrendingDown } from 'lucide-react'
import PropTypes from 'prop-types'

Stock.propTypes = {
    stockData: PropTypes.shape({
        symbol: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        change: PropTypes.string.isRequired,
        volume: PropTypes.string.isRequired
    }).isRequired,
    // addToWatchlist should be at the same level as stockData
    RemovefromWatchlist: PropTypes.func.isRequired
}

function Stock({stockData,RemovefromWatchlist}) {

    const isPositiveChange = parseFloat(stockData.change) >= 0
    const trendingIcon = isPositiveChange ? 
        <TrendingUp className="w-4 h-4 mr-1"/> : 
        <TrendingDown className="w-4 h-4 mr-1"/>
    const changeColorClass = isPositiveChange ? 'text-green-500' : 'text-red-500'

    return (
        <div className="StockItem p-4 hover:bg-[hsl(0,0%,9%)] transition-colors overflow-x-auto">
            <div className="flex items-center justify-between mx-auto min-w-[620px] w-full">
                {/* Stock Info Section */}
                <div className="flex items-center space-x-8 w-1/3 whitespace-nowrap">
                    <h3 className="symbol font-medium">{stockData.symbol}</h3>
                    <span className="name text-gray-400">{stockData.name}</span>
                </div>
               
                {/* Price Info Section */}
                <div className="flex items-center justify-center space-x-8 w-1/3 whitespace-nowrap">
                    <div className="price">{stockData.price}</div>
                    <div className={`change flex items-center ${changeColorClass}`}>
                        {trendingIcon}
                        {stockData.change}
                    </div>
                    <div className="flex items-center text-gray-400">
                        <span className='volume'>{stockData.volume}</span>
                    </div>
                </div>
               
                {/* Action Button */}
                <div className="w-1/3 flex justify-end whitespace-nowrap">
                    <button className="px-4 py-2 rounded-md hover:bg-[hsl(0,0%,9%)] hover:outline-[hsl(0,0%,9%)] transition-colors"
                    onClick={()=>{RemovefromWatchlist(stockData)}}
                    >
                        X
                    </button>
                </div>
            </div>
        </div>
    )
}



export default Stock


