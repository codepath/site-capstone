import '../index.css';
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import ActivityCards from '../BookingPages/ActivityCards'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import backgroundImage from './Assets/backgroundimage.jpg'
import HotelCard from '../BookingPages/HotelCard';
import { useState, useEffect } from 'react'

function Booking({ itinerary }) {
    const [the_itinerary, set_the_itinerary] = useState(null);
    const [loading, setLoading] = useState(true)
    const [itineraryPresent, setItineraryPresent] = useState(false)

    useEffect(() => {
        if (itinerary) {
            set_the_itinerary(itinerary);
            setItineraryPresent(true)
        }
    }, [itinerary]);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }, [])



    return (
        <>
            {loading && (
                <div>
                    <div className="text-4xl px-56 mt-4 ml-5 w-screen h-screen">Loading itinerary...  <CircularProgress /></div>
                </div>
            )}
            {!loading && (
                <div>
                    <BookingMenu itinerary={the_itinerary} itineraryPresent={itineraryPresent}/>
                </div>
            )}
        </>
    );
}



function BookingMenu({ itinerary, itineraryPresent }) {
    console.log(itinerary)
    
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
                        <div className="w-36 h-36 bg-white rounded-full border border-black ml-16"></div>
                        <div className="w-full h-full ml-9">
                            <p className="mt-8 font-black">
                                Email: user@mail.com
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
                                Booking
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
                        
                        <h1 className="text-4xl font-bold text-black mb-2" style={{ textShadow: '1px 1px 2px rgba(255, 255, 255, 0.6)' }}>Booking</h1>

                        </div>
                        <div className="border-t border-black-500 border-2 mb-10" />
                        {itineraryPresent ? (
                            <>
                            <div className="cursor-pointer flex flex-col rounded-md shadow-md border border-blue-500 overflow-y-scroll h-100">
                                {itinerary.Hotel != null && (
                                <>
                                <div className="p-3 overflow-show bg-white mb-3">
                                    <div className="font-bold text-2xl h-10 overflow-scroll text-black">{itinerary?.Hotel?.name}</div>
                                    <div className="flex">
                                        <div className="flex flex-col">
                                            <div className="font-bold">${itinerary?.Hotel?.priceBreakdown?.grossPrice?.value?.toFixed(2)}</div>
                                            <div>Rating: {itinerary?.Hotel?.reviewScore}</div>
                                        </div>
                                        <div className="flex flex-col ml-2">
                                            <div className="text-gray-500">total price</div>
                                            <div className="text-gray-500">{itinerary?.Hotel?.reviewCount} reviews</div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div
                                            className={
                                                itinerary?.Hotel?.reviewScoreWord === 'Good' ||
                                                itinerary?.Hotel?.reviewScoreWord === 'Very Good' ||
                                                itinerary?.Hotel?.reviewScoreWord === 'Excellent'
                                                ? 'font-bold text-green-600'
                                                : ''
                                            }
                                        >
                                            {itinerary?.Hotel?.reviewScoreWord}
                                            {itinerary?.Hotel?.reviewScoreWord === 'Excellent' ? '!' : ''}
                                        </div>
                                    </div>
                                </div>
                                </>
                                )}
                                <div>{itinerary['Activities'].map((item, index) => {
                                    return (<div className="mb-3"><ActivityCards activity={item} checkout={true} key={index} /></div>)
                                })}
                                </div>
                            </div>
                                
                            
                            </>
                        ) : (
                            <div className="flex justify-center items-center h-screen">
                                <Link to="/" className="text-blue-500 text-2xl">Go to homepage to start booking</Link>
                            </div>
                        )}
                          {itineraryPresent && 
                <div>
                    <h2 className='font-bold text-4xl text-white mr-2 mt-[50px]' style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}>Total: ${itinerary?.Hotel?.priceBreakdown?.grossPrice?.value?.toFixed(2)}</h2>
                    <hr className="mt-4 w-64 border-2 border-white" />
                    <div className="flex items-center mt-[100px] ml-[210px]">
                        <h2 className='text-[25px] font-bold text-white mr-4'>Ready to checkout?</h2>
                        <Link to='/Checkout'>
                            <h2 className="text-green-400 font-bold text-[25px] hover:text-green-200">Checkout</h2>
                        </Link>
                    </div>
                </div>
            }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Booking;
