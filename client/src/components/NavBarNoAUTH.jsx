import {Link} from "react-router-dom";
import {TrendingUp } from 'lucide-react'
import PropTypes from 'prop-types';
NavBarNoAUTH.propTypes = {
  handleLogout: PropTypes.func.isRequired
};
function NavBarNoAUTH({handleLogout}) {
  return (
    
    <>
<header className="flex justify-between bg-[#1f2937]">
<div className="flex text-[#ffffff]">
            <TrendingUp className="h-[1.5rem] w-[1.5rem] sm:h-[3rem] sm:w-[3rem]"/>
            <h1 className="text-[1rem] font-bold sm:text-[2rem]">StockTrackerPro</h1>
       </div>
    <div className="flex gap-5 mr-10 text-[#ffffff]">
            <Link to="https://github.com/AWERDdev/">GitHubRepo</Link>
            <div className="BTN-container"><button className="bg-black rounded p-2 w-[5rem] text-[1rem]"onClick={handleLogout}>Logout</button></div>
     </div>
     
     </header>

 
    </>
  )
}

export default NavBarNoAUTH