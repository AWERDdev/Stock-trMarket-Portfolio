import NavBarNoAUTH from '../components/NavBarNoAUTH2.jsx'
import { useNavigate } from 'react-router-dom'; // Update this import
import { useState } from 'react';
import { API_BASE_URL } from '../config'

function SignupPage() {
    const navigate = useNavigate(); // Initialize the navigate hook
    const [Username,setUsername] = useState('');
    const [name,setname] = useState('');
    const [Email,setEmail] = useState('');
    const [Password,setpassword] = useState('');
    const [UsernameError, setUsernameError] = useState('');
    const [nameError, setNameError] = useState('');
    const [EmailError, setEmailError] = useState('');
    const [PasswordError, setPasswordError] = useState('');
    
    
const InputHandling = async ()=>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setUsernameError('');
    setNameError('');
    setEmailError('');
    setPasswordError('');

    if(!Username){
        setUsernameError("Please enter a username");
        return false;
    }
    if(Username.length < 3){
        setUsernameError("Username must be at least 3 characters long");
        return false;
    }

    if(!name){
        setNameError("Please enter a name");
        return false;
    }

    if(!Email){
        setEmailError("Please enter an Email");
        return false;
    }
    if(!regex.test(Email)){
        setEmailError("Email is not valid");
        return false;
    }

    if(!Password){
        setPasswordError("Please enter a password");
        return false;
    }
    if(Password.length < 3){
        setPasswordError("Password must be at least 3 characters ");
        return false;
    }
    const isValid = await SendData();
    return isValid;


  
}
const SendData = async ()=>{
    try{
        const response = await fetch(`${ API_BASE_URL }/signup`,{ // IF you are using a local server swap this with your local host
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Username,
                name,
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
        } else if (response.status === 409) {
            console.log("Email already exists");
            setEmailError(data.message);
            return false;
        } else {
            console.log("Failed to send data");
        }
    }catch(error){
        console.log(`Failed to send data: ${error}`);
    }

}

const functionHandling = async() => {
    const isValid = await InputHandling();
    if (isValid) {
        
        navigate('/MainApp');
    }
}
console.log('Current API_BASE_URL:', API_BASE_URL);
console.log('Current route:', window.location.pathname);

    return (
        
        <main className="h-screen w-screen text-[#ffffff] dark:bg-gray-900">
            <header>
                <NavBarNoAUTH />
            </header>

            <div className="grid justify-center grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto px-4 mt-8">
                <div className="grid gap-1">
                    <label htmlFor="Username" className="form-label">Username</label>
                    <input 
                        type="text"
                        name="Username"
                        id='Username'
                        placeholder="Username"
                        className="input bg-[#1f2937] outline outline-1 outline-black rounded h-9 p-2 focus:valid:outline-[#22c55e] invalid:outline-[#ef4444]"
                        onChange={(e)=> setUsername(e.target.value)} 
                    />
                    <label htmlFor="Username"className='text-[#ef4444] h-4'>{UsernameError}</label>
                </div>

                <div className="grid gap-1">
                <label htmlFor="Name" className="form-label">Name</label>
                    <input 
                        type="text"
                        name="Name"
                        id='Name'
                        placeholder="Name"
                        className="input bg-[#1f2937] outline outline-1 outline-black rounded h-9 p-2 focus:valid:outline-[#22c55e] invalid:outline-[#ef4444]" 
                        onChange={(e)=> setname(e.target.value)} 
                    />
                    <label htmlFor="Name"className='text-[#ef4444] h-4'>{nameError}</label>
                </div>

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
   
    )
}

export default SignupPage
