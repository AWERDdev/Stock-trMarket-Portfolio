
import {Link} from "react-router";
import { Sun, Moon, TrendingUp } from 'lucide-react'
function NaveBar(){
    return(
        <>
<div className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800">

        
       <div className="Title">
             <TrendingUp className="LogoIcon"/>
            <h1>StockTracker Pro</h1>
       </div>
         <div className="links">
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
            <Link to="https://github.com/AWERDdev/">GitHub Repo</Link>
        </div>
    <div className="darkMode-Light-mode">
            <button>
                <Sun className="SunLogo"/>
                <Moon className="MoonLogo"/>
        </button>
     </div>
</div>
        </>
    )
}

export default NaveBar;