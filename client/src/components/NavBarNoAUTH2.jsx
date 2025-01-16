import {Link} from "react-router-dom";
import {TrendingUp } from 'lucide-react'

function NavBarNoAUTH() {
  return (
    
    <>
<header className="flex justify-between bg-[#1f2937]">
<div className="flex text-[#ffffff]">
            <TrendingUp className="h-[1.5rem] w-[1.5rem] sm:h-[3rem] sm:w-[3rem]"/>
            <h1 className="text-[1rem] font-bold sm:text-[2rem]">StockTrackerPro</h1>
       </div>
    <div className="flex gap-5 mr-10 text-[#ffffff]">
            <Link to="https://github.com/AWERDdev/">GitHubRepo</Link>
        
     </div>
     
     </header>

 
    </>
  )
}

export default NavBarNoAUTH