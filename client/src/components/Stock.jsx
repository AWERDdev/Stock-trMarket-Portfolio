import { TrendingUp, TrendingDown } from 'lucide-react'
import PropTypes from 'prop-types'

function Stock({ stockData }) {
    Stock.propTypes = {
        stockData: PropTypes.shape({
            symbol: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            change: PropTypes.number.isRequired,
            volume: PropTypes.number.isRequired,
        }).isRequired
    }

    return (
        <div className="StockItem p-4 hover:bg-[hsl(0,0%,9%)] transition-colors">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                {/* Stock Info Section */}
                <div className="flex items-center space-x-8 w-1/3">
                    <h3 className="symbol font-medium">{stockData.symbol}</h3>
                    <span className="name text-gray-400">{stockData.name}</span>
                </div>
               
                {/* Price Info Section */}
                <div className="flex items-center justify-center space-x-8 w-1/3">
                    <div className="price">{stockData.price}</div>
                    <div className={`change flex items-center ${stockData.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {stockData.change > 0 ? (
                            <TrendingUp className="w-4 h-4 mr-1"/>
                        ) : (
                            <TrendingDown className="w-4 h-4 mr-1"/>
                        )}
                        {stockData.change}
                    </div>
                    <div className="flex items-center text-gray-400">
                        <span className='volume'>{stockData.volume}</span>
                    </div>
                </div>
               
                {/* Action Button */}
                <div className="w-1/3 flex justify-end">
                    <button className="px-4 py-2 rounded-md hover:bg-[hsl(0,0%,9%)] hover:outline-[hsl(0,0%,9%)] transition-colors">
                        Add to Watchlist
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Stock

