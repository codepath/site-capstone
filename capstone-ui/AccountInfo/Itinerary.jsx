import '../index.css';
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import backgroundImage from './Assets/backgroundimage.jpg'
import { useState, useEffect } from "react"
import data from './mockdata-hotels'
import HotelCard from '../BookingPages/HotelCard'
import mockItineraries from '../AccountInfo/mockitinerarydata'



function Itinerary({ arrivalDate, departureDate,
  travelers, destination, 
  destID, cost, setCost
 }) {

  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    setSearchResults(data.results);
  }, []);

  return (
    <div>
     <ItineraryMenu searchResults={searchResults}/>
    </div>
    
  );
}

function ItineraryMenu({searchResults}) {
 
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
                Email: 
              </p>
              <Link to='/Account' className='text-black'>
                <span className="w-3/5 h-10 bg-blue-500 flex flex-row justify-center text-2xl font-black pb-2 rounded-lg mt-10 border border-black border-2 shadow-md">
                  Account
                </span>
              </Link>
                <span className="w-3/5 h-10 bg-blue-300 flex flex-row justify-center text-2xl font-black pb-2 rounded-lg mt-5 border border-black border-2 shadow-md">
                  Itineraries
                </span>
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
        <div className="w-2/3 h-4/5 mb-20 flex flex-col mt-[-10px]">
            <div>
              <h1 className="text-4xl">Itineraries</h1>
            </div>

            <div className="border-t border-black-500 border-2"/>
            <div className="flex flex-col min-h-screen">

              <div className="grid grid-cols-3 gap-6 mt-3">
               { mockItineraries.length === 0 ? "No results found." :
                      mockItineraries.map((mockItinerary) => (
                          <ItineraryCards
                          mockItinerary={mockItinerary}
                          key={mockItinerary.id}
                          />
                      ))
                      
                  }
             </div>
          
          </div>
          

        </div>
      </div>
    </div>

  </>

  );
}

function ItineraryCards({mockItinerary}){
  console.log("mock", mockItinerary)
  return(
    <div>
      <div>
        <h1>Itinerary {mockItinerary.id} </h1>
      </div>
      <div>
        <h3>Hotel: {mockItinerary.Hotel.name}</h3>
      </div>
    </div>

  );

}

export default Itinerary;

