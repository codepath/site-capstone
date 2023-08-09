import '../index.css';
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Itinerary from './Itinerary';
import backgroundImage from './Assets/backgroundimage.jpg'
import { useState, useEffect } from 'react';
import pfp from '../../public/assets/user.png'
import axios from 'axios'


function Account({ authenticated, setAuthenticated }) {

  return (
    <div>
      <AccountMenu
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
      />
    </div>
  );
}

function AccountMenu({ authenticated, setAuthenticated }) {
  const [userData, setUserData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  async function fetchUserDataFromToken(token, userId) {
    console.log("???", token, userId);
    console.log("hereeee");

    
    try {
        // Make an API call to fetch user data using the token
        const response = await axios.get(`https://nomadiafe.onrender.com/api/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Return the user data if successful
        return response.data;
    } catch (error) {
        // Handle errors appropriately
        console.error('Error fetching user data:', error);
        throw error;
    }
}
  useEffect(() => {
    if (authenticated) {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      setIsLoading(true);
      fetchUserData(token, userId);
    }
  }, [authenticated]);

    useEffect(() => {
      const token = localStorage.getItem('token');
    
      if (token) {
        const userId = localStorage.getItem('userId');
        fetchUserData(token, userId);
      }
    }, []);

  const fetchUserData = async (token, userId) => {
    try {
      const user = await fetchUserDataFromToken(token, userId);
      setUserData(user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  console.log("the data", userData)
  console.log("authentication ", authenticated)

  
  return (
    <>
      <div className="flex w-screen h-screen px-64"
            style={{
              /* Set a fallback color in case the image is not loaded */
              backgroundColor: '#0f0c29', // Fallback color
              /* Use the linear-gradient property to create the gradient */
              backgroundImage: `url(${backgroundImage})`, // Use the imported image here
              backgroundSize: 'cover', // Adjust the background size as needed
            }}
            
        
      >
        {/* Main content */}
        <div className="h-full flex flex-grow items-center justify-center">
          <div className="w-1/3 flex-grow p-4 mb-10">
          <h1 className="text-5xl mb-20 ml-2 font-bold font-sans" style={{
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
                            color: '#f0f0f0', // White text color
                            transition: 'text-shadow 0.2s ease-in-out',
                            cursor: 'pointer',
                            // Add other styles to make it stand out more
                            letterSpacing: '2px',
                        }}>
                            Nomadia
                        </h1>
            <img
                src={pfp} // Replace with the actual URL of the profile photo
                alt="Profile"
                className="ml-6 w-1/2 h-1/2 object-cover"
              />
              <p className="mt-8 font-black">
                <strong>Email:  </strong> {userData ? userData.email : ''}
              </p>
            
              <span className="w-3/5 h-10 bg-blue-300 flex flex-row justify-center text-2xl font-black pb-2 rounded-lg mt-10 border border-white border-2 shadow-md">
                Account
              </span>

              <Link to='/Itineraries' className='text-black'>
                <span className="w-3/5 h-10 bg-blue-500 flex flex-row justify-center text-2xl font-black pb-2 rounded-lg mt-5 border border-white border-2 shadow-md">
                  Itineraries
                </span>
              </Link>
             <Link to='/booking' className='text-black'>
              <span className="w-3/5 h-10 bg-blue-500 flex flex-row justify-center text-2xl font-black pb-2 rounded-lg mt-5 border border-white border-2 shadow-md">
                  Booking
                </span>
             </Link>
             <Link to='/Favorites' className='text-black'>
                <span className="w-3/5 h-10 bg-blue-500 flex flex-row justify-center text-2xl font-black pb-2 rounded-lg mt-5 border border-white border-2 shadow-md">
                  Favorites
                </span>
              </Link>
            </div>
          </div>
          
          <div className="w-2/3 h-4/5 mb-20 flex flex-col mt-[-10px] flex flex-row">
            <div>
            <h1 className="text-4xl font-bold text-black mb-2 mt-10" style={{ textShadow: '1px 1px 2px rgba(255, 255, 255, 0.6)' }}>Account</h1>

            </div>
            {!authenticated && <p className="text-blue-100 text-2xl text-center mt-[300px]">Login/Register view!</p>}

          
            {(userData == null && authenticated) && 
              <CircularProgress />
            } 
            {(userData != null && authenticated) && 
            
            <>
                
            <div class="border-t border-black-500 border-2 mb-8"></div>
            <div class="flex flex-col items-center mb-6">
              <h2 class="text-center mb-4 mr-[340px] text-white"><strong>Personal Information</strong></h2>
              <hr className="border-white w-[80%] mb-4 mr-8" />
              <div className="flex flex-col items-center">
                {/* Render user's personal information fields here */}
              </div>
            </div>
            <div class="flex flex-col items-center mb-6 ml-10">
            <div class="flex flex-col items-center mb-6">
          <h2 class="text-center mb-4 mr-[300px] mt-2 whitespace-nowrap"><strong>First Name</strong></h2>
          <div class="flex items-center mr-[60px]">
            <div className="w-80 h-12 bg-gray-200 border border-black">
            <p className="mt-2 ml-2 font-black text-2xl">
              {userData ? userData.name : ''}
            </p>
            </div>
            {/* <button class="w-40 bg-blue-500 text-white px-4 py-2 rounded ml-4 whitespace-nowrap">Change Account</button> */}
          </div>
        </div>

        <div class="flex flex-col items-center mb-6">
          <h2 class="text-center mb-4 mr-[340px]"><strong>Email</strong></h2>
          <div class="flex items-center mr-[60px]">
            <div className="w-80 h-12 bg-gray-200 border border-black">
            {authenticated ? <strong>Email: </strong> : null} {{userData} ? userData.email : ''}

            </div>
            {/* Add button for changing email if needed */}
          </div>
        </div>

        <div class="flex flex-col items-center mb-6">
          <h2 class="text-center mb-4 mr-[270px]"><strong>Phone Number</strong></h2>
          <div class="flex items-center mr-[60px]">
            <div className="w-80 h-12 bg-gray-200 border border-black">
              <p className="mt-2 ml-2 font-black text-2xl">
                {userData ? userData.phone_number : ''}
              </p>
            </div>
            {/* Add button for changing phone number if needed */}
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center mb-6 ml-[20px]">
        <h2 class="text-center mb-4 mr-[450px] text-white"><strong>Password</strong></h2>
        <hr className="border-white w-[80%] mb-7 mr-[100px]" />
        <div class="flex items-center mr-[60px]">
          <div className="w-80 h-12 bg-gray-200 border border-black">
            <div 
              className="mt-1 ml-2 font-black text-2xl" 
              style={{ overflow: 'auto', maxHeight: '60px' }}
            >
              {showPassword ? (
                localStorage.getItem("password") || userData?.password
              ) : '********'}
            </div>
          </div>
          <button 
            onClick={() => setShowPassword(!showPassword)} 
            className="w-40 bg-blue-500 text-white px-4 py-2 rounded ml-4 whitespace-nowrap"
          >
            {showPassword ? 'Hide' : 'Show'} Password
          </button>
        </div>
      </div>
  
          </>
        
        
            
            }
             
            


          </div>
        </div>
      
    </>
  );
}

export default Account;
