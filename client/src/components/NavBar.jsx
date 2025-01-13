
import {Link} from "react-router-dom";
import {TrendingUp } from 'lucide-react'
function NaveBar(){
    return(
        <>
       <div className="flex">
             <TrendingUp className="LogoIcon"/>
            <h1>StockTracker Pro</h1>
       </div>
    <div className="flex gap-5">
    <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
            <Link to="https://github.com/AWERDdev/">GitHub Repo</Link>
     </div>

        </>
    )
}

export default NaveBar;