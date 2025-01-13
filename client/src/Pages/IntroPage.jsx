import {Link} from "react-router-dom";
import {TrendingUp } from 'lucide-react'
 function IntroPage() {

  return (
<>
<main className="h-screen w-screen text-[#ffffff] dark:bg-gray-900">

  <header className="flex justify-between bg-[#1f2937]">
<div className="flex text-[#ffffff]">
            <TrendingUp className="h-[1.5rem] w-[1.5rem] sm:h-[3rem] sm:w-[3rem]"/>
            <h1 className="text-[1rem] font-bold sm:text-[2rem]">StockTrackerPro</h1>
       </div>
    <div className="flex gap-5 m-1 text-[#ffffff]">
    <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
            <Link to="https://github.com/AWERDdev/">GitHubRepo</Link>
     </div>
     
     </header>
     
     <div>
          <div className="flex justify-center text-center">
            <h1 className="text-[2rem] font-bold">Welcome to StockTracker Pro</h1>
          </div>
          
          <div className="flex justify-center text-center">
            <p className="text-[1.5rem]">Your all-in-one solution for real-time stock market tracking and analysis.</p>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8 mx-4">
            <div className="flex justify-center text-center mb-6">
              <h1 className="text-[#ffffff] text-[2rem]">Featured Stocks</h1>
            </div>

        
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="font-bold text-xl">AAPL</div>
                <div className="text-green-500">+2.5%</div>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="font-bold text-xl">GOOGL</div>
                <div className="text-green-500">+2.5%</div>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="font-bold text-xl">MSFT</div>
                <div className="text-green-500">+2.5%</div>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="font-bold text-xl">AMZN</div>
                <div className="text-green-500">+2.5%</div>
              </div>
            </div>
          </div>
        </div>

     
     </main>
</> 
)
}

export default IntroPage