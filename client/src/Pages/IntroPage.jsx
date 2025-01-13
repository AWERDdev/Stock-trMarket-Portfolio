import NaveBar from '../components/NavBar'
function IntroPage(){
    return(
        <>
        <div><NaveBar/></div>
        <div>
            {/* context */}
            <div className="grid justify-center">
            <div>
                <h1>Welcome to StockTracker Pro</h1>
            </div>    
            <div>
                <p>Your all-in-one solution for real-time stock market tracking and analysis.</p>
                </div>
                </div>
        </div>
        </>
    )
}

export default IntroPage;