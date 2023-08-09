import '../index.css';
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import backgroundImage from './Assets/backgroundimage.jpg'
import pfp from '../../public/assets/user.png'
import {useState, useEffect} from 'react'
import axios from 'axios';


function Favorites({authenticated}) {
  return (
    <div>
       <FavoritesMenu authenticated={authenticated}/>

    </div>
    
  );
}
function FavoritesMenu({authenticated}) {
    
const [email, setEmail] = useState(null);

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
  const token = localStorage.getItem('token');

  if (token) {
    const userId = localStorage.getItem('userId');
    fetchUserData(token, userId);
  }
}, []);

const fetchUserData = async (token, userId) => {
  try {
    const user = await fetchUserDataFromToken(token, userId);
    setEmail(user.email);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

console.log("the data", email)

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
              {authenticated ? <strong>Email: </strong> : null} {{email} ? email : ''}

                </p>
            

                    
                    <Link to='/Account' className='text-black'>
                    <span className="w-3/5 h-10 bg-blue-500 flex flex-row justify-center text-2xl font-black pb-2 rounded-lg mt-10 border border-white border-2 shadow-md">
                        Account
                    </span>
                    </Link>
                    <Link to='/Itineraries' className='text-black'>
                    <span className="w-3/5 h-10 bg-blue-500 flex flex-row justify-center text-2xl font-black pb-2 rounded-lg mt-5 border border-white border-2 shadow-md">
                        Itineraries
                    </span>
                    </Link>
                <Link to='/Booking' className='text-black'>
                    <span className="w-3/5 h-10 bg-blue-500 flex flex-row justify-center text-2xl font-black pb-2 rounded-lg mt-5 border border-white border-2 shadow-md">
                        Booking
                    </span>
                </Link>
                    <span className="w-3/5 h-10 bg-blue-300 flex flex-row justify-center text-2xl font-black pb-2 rounded-lg mt-5 border border-white border-2 shadow-md">
                        Favorites
                    </span>
                </div>
            </div>
            <div className="w-2/3 h-4/5 mb-20 flex flex-col mt-[-10px]">
                <div>
                <h1 className="text-4xl font-bold text-black mb-2 mt-10" style={{ textShadow: '1px 1px 2px rgba(255, 255, 255, 0.6)' }}>Favorites</h1>

                </div>
                <div class="border-t border-black-500 border-2"/>
                
          </div>
        </div>

    </>
    );
}

export default Favorites;
