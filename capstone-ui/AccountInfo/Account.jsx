import '../index.css';
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Itinerary from './Itinerary';
import backgroundImage from './Assets/backgroundimage.jpg'

function Account() {
  return (
    <div>
      <AccountMenu />
    </div>
  );
}

function AccountMenu() {
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
            <h1 className="text-5xl mb-20 ml-2 font-bold font-sans">Nomadia</h1>
            <div className="w-36 h-36 bg-white rounded-full border border-black ml-16"></div>
            <div className="w-full h-full ml-9">

              <p className="mt-8 font-black">
                <strong>Email:  </strong> user@name.com
              </p>
            
              <span className="w-3/5 h-10 bg-blue-300 flex flex-row justify-center text-2xl font-black pb-2 rounded-lg mt-10 border border-black border-2 shadow-md">
                Account
              </span>

              <Link to='/Itineraries' className='text-black'>
                <span className="w-3/5 h-10 bg-blue-500 flex flex-row justify-center text-2xl font-black pb-2 rounded-lg mt-5 border border-black border-2 shadow-md">
                  Itineraries
                </span>
              </Link>
             <Link to='/booking' className='text-black'>
              <span className="w-3/5 h-10 bg-blue-500 flex flex-row justify-center text-2xl font-black pb-2 rounded-lg mt-5 border border-black border-2 shadow-md">
                  Booking
                </span>
             </Link>
             <Link to='/Favorites' className='text-black'>
                <span className="w-3/5 h-10 bg-blue-500 flex flex-row justify-center text-2xl font-black pb-2 rounded-lg mt-5 border border-black border-2 shadow-md">
                  Favorites
                </span>
              </Link>
            </div>
          </div>
          
          <div className="w-2/3 h-4/5 mb-20 flex flex-col mt-[-10px] flex flex-row">
            <div>
              <h1 className="text-4xl">Account</h1>
            </div>
            
            <div class="border-t border-black-500 border-2 mb-8"></div>

            <div class="flex flex-col items-center mb-6 ml-10">
            <div class="flex flex-col items-center mb-6">
              <h2 class="text-center mb-4 mr-[620px] mt-6 whitespace-nowrap"><strong>First Name</strong></h2>
              <div class="flex items-center mr-[200px]">
                <div className="w-80 h-12 bg-gray-200 border border-black"></div>
                <button class="w-40 bg-blue-500 text-white px-4 py-2 rounded ml-4 whitespace-nowrap">Change Account</button>
              </div>
            </div>

            <div class="flex flex-col items-center mb-6">
              <h2 class="text-center mb-4  mr-[625px] whitespace-nowrap"><strong>Last Name</strong></h2>
              <div class="flex items-center mr-[203px]">
                <div className="w-80 h-12 bg-gray-200 border border-black"></div>
                <button class="w-40 bg-blue-500 text-white px-4 py-2 rounded ml-4 whitespace-nowrap">Change Account</button>
              </div>
            </div>

            <div class="flex flex-col items-center mb-6">
              <h2 class="text-center mb-4 mr-[660px]"><strong>Email</strong></h2>
              <div class="flex items-center mr-[200px]">
                <div className="w-80 h-12 bg-gray-200 border border-black"></div>
                <button class="w-40 bg-blue-500 text-white px-4 py-2 rounded ml-4 whitespace-nowrap">Change Email</button>
              </div>
            </div>

            <div class="flex flex-col items-center mb-6">
              <h2 class="text-center mb-4 mr-[625px]"><strong>Password</strong></h2>
              <div class="flex items-center mr-[200px]">
                <div className="w-80 h-12 bg-gray-200 border border-black"></div>
                <button class="w-40 bg-blue-500 text-white px-4 py-2 rounded ml-4 whitespace-nowrap">Change Password</button>
              </div>
            </div>

            <div class="flex flex-col items-center mb-6">
              <h2 class="text-center mb-4 mr-[595px] whitespace-nowrap"><strong>Phone Number</strong></h2>
              <div class="flex items-center mr-[200px]">
                <div className="w-80 h-12 bg-gray-200 border border-black"></div>
                <button class="w-40 bg-blue-500 text-white px-4 py-2 rounded ml-4 whitespace-nowrap">Change Number</button>
              </div>
            </div>

            <div class="flex flex-col items-center mb-6">
              <div class="flex items-center mr-[200px]">
                <button class="w-[300px] bg-red-400 text-white px-4 py-2 rounded mt-6 ml-4 whitespace-nowrap">Delete Account</button>
              </div>
            </div>
          </div>


          </div>
        </div>
      </div>

    </>
  );
}

export default Account;
