import '../index.css';
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import ActivityCards from '../BookingPages/ActivityCards'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import backgroundImage from './Assets/backgroundimage.jpg'
import HotelCard from '../BookingPages/HotelCard';
import { useState, useEffect } from 'react'
import pfp from '../../public/assets/user.png'
import axios from 'axios'
import FlightsCard from '../BookingPages/FlightCard';





function Booking({ itinerary, authenticated }) {
    const [the_itinerary, set_the_itinerary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [itineraryPresent, setItineraryPresent] = useState(false)
    const [unsavedChanges, setUnsavedChanges] = useState(false); // Add this state

    window.addEventListener('beforeunload', (event) => {
        event.returnValue = `Are you sure you want to leave?`;
      });


    let storageitem = localStorage.getItem("Itinerary");
    function fetch() {
        if (itinerary != null && (itinerary.Hotel != null || itinerary.Activities != [] || itinerary.flight != null)) {
            console.log("?", itinerary)
            set_the_itinerary(itinerary);
            setItineraryPresent(true)
            setLoading(false);
            localStorage.setItem("Itinerary", JSON.stringify(itinerary))
        } else if (storageitem != null && storageitem.Hotel != null) {
            set_the_itinerary(JSON.parse(storageitem));
            setLoading(false);
            setItineraryPresent(true);
            setUnsavedChanges(true);
            console.log("the itinerary ", itinerary)
        } else {
            setLoading(true);
            setItineraryPresent(false);
            setUnsavedChanges(false);
        }
        // if (storageitem != null && storageitem.Hotel != null) {
        //     set_the_itinerary(JSON.parse(storageitem));
        //     setLoading(false);
        //     setItineraryPresent(true);
        //     setUnsavedChanges(true);
        // } else {
        //     setLoading(true);
        //     setItineraryPresent(false);
        //     setUnsavedChanges(false);
        // }

    }
    // useBeforeUnload(
    //     React.useCallback(() => {
    //         if (unsavedChanges) {
    //             localStorage.setItem("Itinerary", JSON.stringify(the_itinerary));
    //         }
    //     }, [unsavedChanges, the_itinerary])
    // );


    useEffect(() => {

    fetch();
    console.log("is itinerary null", itinerary)
        const handleBeforeUnload = (event) => {
            if (itineraryPresent && loading) {
                event.preventDefault();
                event.returnValue = ''; // This empty string will trigger the browser prompt.
                localStorage.setItem("Itinerary", JSON.stringify(the_itinerary));

            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        if (itinerary === null) {
            set_the_itinerary(JSON.parse(localStorage.getItem("Itinerary")));
        }
    }, [the_itinerary]);

  



    return (
        <>
           
       <BookingMenu itinerary={the_itinerary} itineraryPresent={itineraryPresent} loading={loading} authenticated={authenticated} set_the_itinerary={set_the_itinerary}/>
               
        </>
    );
}



function BookingMenu({ itinerary, itineraryPresent, loading, authenticated, set_the_itinerary }) {



    const [email, setEmail] = useState(null);

    async function fetchUserDataFromToken(token, userId) {
        
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
                                <span className="w-3/5 h-10 bg-blue-500 flex flex-row justify-center text-2xl font-black pb-2 rounded-lg mt-12 border border-white border-2 shadow-md">
                                    Account
                                </span>
                            </Link>
                            <Link to='/Itineraries' className='text-black'>
                                <span className="w-3/5 h-10 bg-blue-500 flex flex-row justify-center text-2xl font-black pb-2 rounded-lg mt-5 border border-white border-2 shadow-md">
                                    Itineraries
                                </span>
                            </Link>
                            <span className="w-3/5 h-10 bg-blue-300 flex flex-row justify-center text-2xl font-black pb-2 rounded-lg mt-5 border border-white border-2 shadow-md">
                                Booking
                            </span>
                            <Link to='/Favorites' className='text-black'>
                                <span className="w-3/5 h-10 bg-blue-500 flex flex-row justify-center text-2xl font-black pb-2 rounded-lg mt-5 border border-white border-2 shadow-md">
                                    Favorites
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="w-2/3 h-4/5 mb-20 flex flex-col mt-[-10px]">
                        <div>
                        
                        <h1 className="text-4xl font-bold text-black mb-2 mt-10" style={{ textShadow: '1px 1px 2px rgba(255, 255, 255, 0.6)' }}>Booking</h1>

                        </div>
                       
                     
                        <div className="border-t border-black-500 border-2 mb-10" />
                        {!loading ? (
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
                                })}{itineraryPresent && itinerary.flight != null && (
                                    <div className="flight-card-container">
                                      <FlightsCard
                                        flight={itinerary.flight}
                                        itinerary={itinerary}
                                        setItinerary={set_the_itinerary}
                                        checkout={true} // Adjust this as needed
                                        cost={'0'}
                                        setCost={'0'}
                                      />
                                    </div>
                                  )}
                            
                                </div>
                            </div>
                                
                            
                            </>
                        ) : (
                            <div className="flex justify-center items-center h-screen">
                                <Link to="/" className="text-blue-100 text-2xl">Go to homepage to start booking!</Link>
                            </div>
                        )}
                          {(itineraryPresent && itinerary.Hotel != null) ? (
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
                          ) : <p></p>
                
            }
                    </div>
                </div>
        
        </>
    );
}

export default Booking;
