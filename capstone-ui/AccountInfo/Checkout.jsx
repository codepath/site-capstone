import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function Checkout({ itinerary, arrivalDate, departureDate, destination }) {
  const [the_itinerary, set_the_itinerary] = useState(null);
  const [hotelDestination, setHotelDestination] = useState(destination);
  const [hotelArrivalDate, setHotelArrivalDate] = useState(arrivalDate);
  const [hotelDepartureDate, setHotelDepartureDate] = useState(departureDate);
  useEffect(() => {
    if (itinerary) {
      set_the_itinerary(itinerary);
    }
    // Update other state variables here if needed
    setHotelDestination(destination);
    setHotelArrivalDate(arrivalDate);
    setHotelDepartureDate(departureDate);
  }, [itinerary, destination, arrivalDate, departureDate]);

  if (itinerary.length == 0) {
    return (
      <div className="flex w-screen h-screen items-center justify-center">
        <div className="text-2xl ml-2">Fetching Checkout Information...</div>
        <CircularProgress />

      </div>
    );
  } else {
    // Provided data
  const hotelId = the_itinerary?.Hotel?.id;
  const checkinDate = the_itinerary?.Hotel?.checkinDate;
  const checkoutDate = the_itinerary?.Hotel?.checkoutDate; // New checkout date
  const numberOfRooms = 1;

    // Constructed URL with variables
  const baseUrl = "https://secure.booking.com/book.html";
  const hotelIdParam = `hotel_id=${hotelId}`;
  const checkinParam = `checkin=${checkinDate}`;
  const checkoutParam = `checkout=${checkoutDate}`; // Add the checkout parameter
  const intervalParam = "interval=2"; // Assuming this remains fixed
  const stageParam = "stage=1"; // Assuming this remains fixed
  const roomsParam = `nr_rooms_${hotelId}01_325315371_3_0_0=${numberOfRooms}`;

// Concatenate all parameters into the final URL
const bookingUrl = `${baseUrl}?${hotelIdParam}&${checkinParam}&${checkoutParam}&${intervalParam}&${stageParam}&${roomsParam}`;



  return (
    <div
      className="flex w-screen h-screen px-64"
      style={{
        background: 'rgb(16,16,16)',
        background: 'linear-gradient(90deg, rgba(16,16,16,1) -124%, rgba(90,90,95,1) -43%, rgba(140,143,144,1) 14%, rgba(182,189,195,1) 27%, rgba(232,237,238,1) 87%, rgba(254,255,255,1) 100%)',
      }}
    >
      <div
        style={{
          width: '900px',
          height: '600px',
          backgroundColor: 'white',
          boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)',
        }}
        className="mt-10 ml-20"
      >
        <h1 className="text-5xl mb-20 ml-2 font-bold font-sans text-black mt-10 ml-[40px] mb-12">Nomadia</h1>

        <div className="flex">
          <div className="mr-2 text-6xl mt-10 ml-[218px]">Hotel in </div>
          <div className="font-semibold text-blue-500 text-6xl mt-10"> {hotelDestination?.toUpperCase()}</div>
        </div>
        <div className="flex-auto">
          <div className="text-4xl flex flex-col mt-3">
            <div className='ml-[240px]'>{hotelArrivalDate} to {hotelDepartureDate}</div>
        <div className="text-2xl mt-10 ml-[345px]">Total trip cost: ${the_itinerary?.Hotel?.priceBreakdown?.grossPrice?.value?.toFixed(2)}</div>
        <div className="text-[20px] text-black font-semibold mt-[140px] ml-[300px]">
              For booking, please visit <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="underline">Booking.com</a>.
            </div>
      
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 text-sm text-white font-semibold">
        *Prices are subject to change based on availability and booking.com's policies.
      </div>
    </div>
  );
  }

  
}

export default Checkout;
