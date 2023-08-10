import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import axios from 'axios';

const BASE_URL = 'https://nomadiafe.onrender.com/api';

export default function Navbar({
    authenticated,
    setAuthenticated,
    name,
    setName, setDepartureDate, setArrivalDate, setUserId, setItinerary }) {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [registerLoad, setRegisterLoad] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [localName, setLocalName] = useState('');
  const [localPhoneNumber, setLocalPhoneNumber] = useState('');




  const navigate = useNavigate()

  async function handleLogout() {
    // Update authenticated state to false
    setAuthenticated(false);
  
    // Clear form fields

    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setPhoneNumber('');
    setName('');
    localStorage.removeItem('token');
    localStorage.removeItem("password");
    localStorage.removeItem("Itinerary");

    setUserId(0)
    setItinerary({'Activities' : [],
                        'Hotel' : null,
                        'flight': null}) //resets itinerary when user logs out

    // Navigate to the home page
    navigate('/')
        location.reload()
  }

 

  async function handleRegister(e) {
    e.preventDefault();
    const userData = {
      name: localName,
      password: password,
      email: email,
      phone_number: localPhoneNumber,
    };
    setRegisterLoad(true)

    localStorage.setItem("password", password);

    if (!/^\d{10}$/.test(localPhoneNumber)) {
      setPhoneError('Phone number must be 10 digits.');
      return;
    }

      
    try {
      const response = await axios.post('https://nomadiafe.onrender.com/api/register', userData);
      // Assuming the response contains a user object upon successful registration
      const { token, newUser } = response.data;
      // console.log(response.data);
      localStorage.setItem("token", token)
      // localStorage.setItem('userId', newUser.id); // Save the user ID
      // setUserId(newUser.id)




      // Update authenticated state to true
      setAuthenticated(true);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setRegisterLoad(false)
      setRegisterOpen(false); // Close the register modal after successful registration

      // Navigate to the "Account" page
      if (authenticated) {
        navigate('/'); 

      }

    } catch (error) {
      // Handle registration error
      setRegisterLoad(false)
      if (error.response && error.response.status === 500) {
        // Email conflict error
        setEmailError('Email already exists. Please use a different email.');
    } else {
        // Other registration error
        setEmailError('Registration Failed');
    }
    console.error(error);

    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    const userData = {
      password: password,
      email: email,
    };
    console.log("userdata", userData);
    localStorage.setItem("password", password);
    try {
      const response = await axios.post(`https://nomadiafe.onrender.com/api/login`, userData);
      // Assuming the response contains a token and user object upon successful login
      console.log(response);
      const { token, user } = response.data;
      console.log("userData/log", user)
      console.log("?????", response.data);
      setUserId(user.id)

      // Save token in local storage or a secure cookie for future authenticated requests
      localStorage.setItem('token', token);
      localStorage.setItem('userId', user.id); // Save the user ID


      // Update authenticated state to true
      setAuthenticated(true);
      setEmail('');
      setPassword('');
      setLoginOpen(false); /// Close the login modal after successful login

      // Navigate to the "Account" page
      if (authenticated) {
        navigate('/'); 

      }
    // This will trigger a full page reload
      // If you are using React Router's Switch and Route components for navigation, you can use:
      // history.push('/Account'); // Make sure to have history object from react-router-dom available
    } catch (error) {
      // Handle login error
      if (error.response && error.response.status === 400) {
        // Invalid login credentials
        setLoginError('Invalid email or password.');
    } else {
        // Other login error
        setLoginError('Login Failed');
    }
    console.error(error);
      console.error(error);
    }
  }

    return (
      
        <div className="px-56 bg-gray-100 bg-opacity-75 flex h-16 border-b border-blue-500 sticky top-0 z-10 justify-between">
        <Link to="/" className="flex">
          <div className="flex">
            <Button onClick={() => {setDepartureDate(''), setArrivalDate('')}}>Home</Button>
          </div>
        </Link>

        <div className="flex">
        
        <div className="flex">
          {authenticated ? (
            <>
                <Link to="/Account" className="flex">
                <div className="flex">
                <Button>Account</Button>
                </div>
                </Link>
                <Button onClick={handleLogout}>Sign out</Button>
            </>
          ) : (
            <>
              <Button onClick={() => setRegisterOpen(true)}>Sign up</Button>
              <Button onClick={() => setLoginOpen(true)}>Log in</Button>
            </>
          )}
          </div>
                <Modal 
                    open={registerOpen}
                    >
                        <div className="flex justify-center items-center h-screen font-sans">
                            <div className="border w-72 bg-white border-blue-500 rounded-md px-3">
                                <div>
                                    <form onSubmit={handleRegister}>
                                        <div className="flex justify-between">
                                            <div><h2 className="text-2xl">Register</h2></div>
                                            <div title="Close register modal" className="flex cursor-pointer w-5 justify-end" onClick={() => setRegisterOpen(false)}>—</div>
                                        </div>
                                        <div>Save your itineraries and view past bookings.</div>
                                        <div className="bg-blue-500 w-full h-0.5 my-3"></div>
                                        <div>Name<span className="text-red-500">*</span></div>
                                        <input className="border text-center border-blue-500 rounded-md w-full mb-4" 
                                             onChange={(e) => {
                                                setName(e.target.value);
                                                setLocalName(e.target.value);
                                              }}
                                            type="name" required 
                                        />
                                        <div>Email<span className="text-red-500">*</span></div>
                                        <input className="border text-center border-blue-500 rounded-md w-full mb-4" 
                                             onChange={(e) => {
                                                setEmail(e.target.value);
                                                setEmailError(''); // Clear the error message when email changes
                                              }}
                                            type="email" required 
                                        />
                                        <div>PhoneNumber<span className="text-red-500">*</span></div>
                                        <input className="border text-center border-blue-500 rounded-md w-full mb-4" 
                                             onChange={(e) => {
                                                setPhoneNumber(e.target.value);
                                                setPhoneError(''); // Clear the error message when phone number changes
                                                setLocalPhoneNumber(e.target.value);
                                              }}
                                              type="text" // Using "text" type as it's a phone number
                                              required
                                            />
                                            {phoneError && (
                                              <p className="text-red-500 text-sm">{phoneError}</p>
                                            )}
                                        <div>Password<span className="text-red-500">*</span></div>
                                        <input className="border text-center border-blue-500 rounded-md w-full mb-4" 
                                            value={password} onChange={(e) => setPassword(e.target.value)}
                                            type="password" required 
                                        />
                                        <div>Confirm password<span className="text-red-500">*</span></div>
                                        <input className="border text-center border-blue-500 rounded-md w-full mb-2" 
                                            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                            type="password" required 
                                        />
                                        {(confirmPassword !== password) && (
                                            <div className="text-red-500 mb-3">Passwords do not match.</div>
                                        )}
                                        {registerLoad && (
                                            <div>Creating account... <CircularProgress size={25}/></div>
                                        )}
                                        {emailError && (
                                            <p className="text-red-500 text-sm">{emailError}</p>
                                        )}
                                       
                                        <Button sx={{'border': '1px solid', 
                                                    'height' : '50px',
                                                    'width' : '100%',
                                                    'borderRadius' : '5px',
                                                    'marginBottom' : '10px'}}
                                                disabled={email === "" ||
                                                        password === "" ||
                                                        confirmPassword === "" ||
                                                        confirmPassword !== password
                                                        ? true : false}
                                                onClick={handleRegister}>Submit</Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                </Modal>
                <Modal 
                    open={loginOpen}
                    >
                        <div class="flex justify-center items-center h-screen font-sans">
                            <div className="border w-72 bg-white border-blue-500 rounded-md px-3">
                                <div>
                                    <form onSubmit={handleLogin}>
                                        <div className="flex justify-between">
                                            <div><h2 className="text-2xl">Log in</h2></div>
                                            <div title="Close log in modal" className="flex cursor-pointer w-5 justify-end" onClick={() => setLoginOpen(false)}>—</div>
                                        </div>
                                        <div>View your saved itineraries and past bookings.</div>
                                        <div className="bg-blue-500 w-full h-0.5 my-3"></div>
                                        <div>Email<span className="text-red-500">*</span></div>
                                        <input
                                            className="border text-center border-blue-500 rounded-md w-full mb-4"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                setLoginError('');
                                            }}
                                            type="email"
                                            required
                                        />
                                        <div>Password<span className="text-red-500">*</span></div>
                                        <input
                                            className="border text-center border-blue-500 rounded-md w-full mb-4"
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                                setLoginError('');
                                            }}
                                            type="password"
                                            required
                                        />
                                         {loginError && (
                                            <p className="text-red-500 text-sm">{loginError}</p>
                                        )}
                                        <Button sx={{'border': '1px solid', 
                                                    'height' : '50px',
                                                    'width' : '100%',
                                                    'borderRadius' : '5px',
                                                    'marginBottom' : '10px'}}
                                                disabled={email === "" ||
                                                        password === ""
                                                        ? true : false}
                                                onClick={handleLogin}>Submit</Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                </Modal>
            </div>
        </div>
    )
}