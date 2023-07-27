import '../index.css';
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import backgroundImage from './Assets/backgroundimage.jpg'
function Budget() {
  return (
    <div>
       <BudgetMenu/>
    </div>
    
  );
}

function BudgetMenu() {
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
                <h1 className="text-5xl mb-8 ml-6 font-bold font-sans">Nomadia</h1>
                <div className="w-36 h-36 bg-white rounded-full border border-black ml-16"></div>
                    <div className="w-full h-full ml-9">
                        <p className="mt-8 font-black">
                        Email: 
                        </p>
                        <Link to='/Account' className='text-black'>
                        <span className="w-3/5 h-10 bg-blue-500 flex flex-row justify-center text-2xl font-black pb-2 rounded-lg mt-10 border border-black border-2 shadow-md">
                            Account
                        </span>
                        </Link>
                        <Link to='/Itineraries' className='text-black'>
                        <span className="w-3/5 h-10 bg-blue-500 flex flex-row justify-center text-2xl font-black pb-2 rounded-lg mt-5 border border-black border-2 shadow-md">
                            Itineraries
                        </span>
                        </Link>
                        <span className="w-3/5 h-10 bg-blue-300 flex flex-row justify-center text-2xl font-black pb-2 rounded-lg mt-5 border border-black border-2 shadow-md">
                            Budget
                        </span>
                        <Link to='/Favorites' className='text-black'>
                        <span className="w-3/5 h-10 bg-blue-500 flex flex-row justify-center text-2xl font-black pb-2 rounded-lg mt-5 border border-black border-2 shadow-md">
                            Favorites
                        </span>
                        </Link>
                    
                    </div>
                </div>
                <div className="w-2/3 h-4/5 mb-20 flex flex-col mt-[-10px]">
                    <div>
                    <h1 className="text-4xl">Budget</h1>
                    </div>
                    <div class="border-t border-gray-500 border-2"/>
                    <div>
                    stuff
                    </div>
              </div>
            </div>
            </div>
    
        </>
    );
}

export default Budget;