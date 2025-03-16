import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; // Update this import
function Stock({ stockData, addToWatchlist }) {
    const navigate = useNavigate();
    const truncateText = (text, maxLength) => {
        if (!text) return "None";
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };
    const handleNav = () =>{
        navigate(stockData.website)
    }
    return (
        <div className="StockItem p-4 hover:cursor-pointer hover:bg-[hsl(0,0%,9%)] transition-colors" onClick={handleNav}>
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                {/* Stock Info Section */}
                <div className="flex space-x-8 w-1/3 truncate">
                    <h3 className="symbol font-medium">{stockData.symbol || "None"}</h3>
                    <span className="name text-gray-400" title={stockData.companyName}>
                        {truncateText(stockData.companyName, 20)}
                    </span>
                </div>

                {/* Price Info Section */}
                <div className="flex items-center justify-center space-x-8 w-1/3 truncate">
                    <div className="price">{stockData.price ?? "None"}</div>
                    <div className="flex items-center">{stockData.changes ?? "None"}</div>
                    <div className="flex items-center text-gray-400">
                        <span className="volume">{stockData.volAvg ?? "None"}</span>
                    </div>
                </div>

                {/* Action Button */}
                <div className="w-1/3 flex justify-end">
                    <button
                        className="px-4 py-2 rounded-md hover:bg-[hsl(0,0%,9%)] transition-colors"
                        onClick={() => addToWatchlist(stockData)}
                    >
                        AddToWatchList
                    </button>
                </div>
            </div>
        </div>
    );
}

Stock.propTypes = {
    stockData: PropTypes.shape({
        symbol: PropTypes.string,
        price: PropTypes.number,
        volAvg: PropTypes.number,
        website: PropTypes.string,
        changes: PropTypes.number,
        companyName: PropTypes.string
    }).isRequired,
    addToWatchlist: PropTypes.func.isRequired
};

export default Stock;
