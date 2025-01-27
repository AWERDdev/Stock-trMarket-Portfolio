import NavBarNoAUTH from '../components/NavBarNoAUTH2.jsx';
import { useNavigate } from 'react-router-dom'; // Update this import
import { useState } from 'react';
import { API_BASE_URL } from '../config'
function LoginPage(){
    
    const navigate = useNavigate(); // Initialize the navigate hook
    const [Email,setEmail] = useState('');
    const [Password,setpassword] = useState('');
    const [EmailError, setEmailError] = useState('');
    const [PasswordError, setPasswordError] = useState('');
    const [InvalidCredentialsError, setInvalidCredentialsError] = useState('');
    
    const fetchWithErrorTracking = async (url, options) => {
        try {
            const response = await fetch(url, options);
            console.log(`Request to ${url}:`, {
                status: response.status,
                headers: Object.fromEntries(response.headers),
                ok: response.ok
            });
            
            if (!response.ok) {
                const errorData = await response.text();
                console.error('Response error:', errorData);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return response;
        } catch (error) {
            console.error('Fetch error:', {
                message: error.message,
                url,
                options
            });
            throw error;
        }
    };
    fetchWithErrorTracking()
    const InputHandling = async () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError('');
        setPasswordError('');
        if(!Email){
            setEmailError("Please enter an Email");
            return false;
        }
        else if(!regex.test(Email)){
            setEmailError("Email is not valid");
            return false;
        }
    
        if(!Password){
            setPasswordError("Please enter a password");
            return false;
        }
        else if(Password.length < 3){
            setPasswordError("Password must be at least 3 characters ");
            return false;
        }
        const isValid = await SendData();
        return isValid;
    }
    const SendData = async ()=>{
        try{
            const response = await fetch(`${ API_BASE_URL }/login`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Email,
                    Password
                }),
            });
            console.log('API_BASE_URL:', API_BASE_URL);

            const data = await response.json();
    if (data.token) {
        console.log("token stored in local storage");
        localStorage.setItem('token', data.token);
    }
        if (response.ok) {
            console.log("Data sent successfully");
            return true;
        } else{ 
            console.log("Invalid credentials");
            setInvalidCredentialsError(data.message);
            return false;
        } 
        }catch(error){
            console.log(`Failed to send data: ${error}`);
        }
    
    }
    
    const functionHandling = async () => {
        const isValid = await InputHandling();
        if (isValid) {
            SendData();
            navigate('/MainApp');
        }
    }
    console.log('Current API_BASE_URL:', API_BASE_URL);
    console.log('Current route:', window.location.pathname);

    return(
        <>
    <main className="h-screen w-screen text-[#ffffff] dark:bg-gray-900">
            <header>
                <NavBarNoAUTH />
            </header>
            <div className='flex justify-center text-center'>
                    <label className='text-[#ef4444] h-4'>{InvalidCredentialsError}</label>
                </div>
            <div className="grid justify-center grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto px-4 mt-8">
                
                <div className="grid gap-1">
                <label htmlFor="Email" className="form-label">Email</label>
                    <input 
                        type="email"
                        name="email"
                        id="Email"
                        placeholder="Email"
                        className="input bg-[#1f2937] outline outline-1 outline-black rounded h-9 p-2 focus:valid:outline-[#22c55e] invalid:outline-[#ef4444]" 
                        onChange={(e)=> setEmail(e.target.value)} 
                    />
                    <label htmlFor="Email"className='text-[#ef4444] h-4'>{EmailError}</label>
                </div>
                
                <div className="grid gap-1">
                <label htmlFor="Passsword" className="form-label">Passsword</label>
                    <input 
                        type="password"
                        name="password"
                        id='Passsword'
                        placeholder="Password"
                        className="input bg-[#1f2937] outline outline-1 outline-black rounded h-9 p-2 focus:valid:outline-[#22c55e] invalid:outline-[#ef4444]" 
                        onChange={(e)=> setpassword(e.target.value)} 
                    />
                        <label htmlFor="Password"className='text-[#ef4444] h-4'>{PasswordError}</label>
                </div>
            
           
            </div>
            <div className='flex justify-center mt-6'>
                <button
                 className='signupBTN bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={functionHandling}
                 >
                    Create Account
                  

                    </button>
                </div>
        </main>

        </>
    )
}

export default LoginPage;