import '../index.css';
import { useState, useEffect } from 'react';
import HotelModal from './HotelModal';

export default function HotelCard({ hotel, setModalOpen, modalOpen, itinerary, 
                                    setItinerary, cost, setCost, checkout = false }) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    // Check if the hotel is already in the itinerary
    setAdded(itinerary.Hotel && itinerary.Hotel.name === hotel.name);
  }, [itinerary, hotel]);

  const updateItinerary = () => {
    const oldHotelCost = itinerary.Hotel
      ? parseFloat(itinerary.Hotel.priceBreakdown.grossPrice.value)
      : 0;
  
    const newHotelCost = parseFloat(hotel.priceBreakdown.grossPrice.value);
  
    const newCost = (parseFloat(cost) - oldHotelCost + newHotelCost).toFixed(2);
  
    setCost(newCost);
  
    setItinerary((prevItinerary) => ({
      ...prevItinerary,
      Hotel: hotel,
    }));
  };

  return (
    <>
      {!modalOpen && (
        <div className="flex flex-col rounded-md w-76 shadow-md border border-blue-500">
          {!checkout && (
            <div className="overflow-hidden">
              <img className="w-full object-cover h-56 rounded-md" src={hotel.photoMainUrl} alt="Hotel" />
            </div>
          )}
          <div className="p-3 overflow-show">
            <div className="font-bold text-2xl h-10 overflow-scroll">{hotel.name}</div>
            <div className="flex">
              <div className="flex flex-col">
                <div className="font-bold">${hotel?.priceBreakdown?.grossPrice?.value?.toFixed(2)}</div>
                <div>Rating: {hotel.reviewScore}</div>
              </div>
              <div className="flex flex-col ml-2">
                <div className="text-gray-500">total price</div>
                <div className="text-gray-500">{hotel.reviewCount} reviews</div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className={hotel.reviewScoreWord === 'Good' ||
                              hotel.reviewScoreWord === 'Very Good' ||
                              hotel.reviewScoreWord === 'Excellent'
                              ? `font-bold text-green-600`
                              : ""}>
                {hotel.reviewScoreWord}
                {hotel.reviewScoreWord === 'Excellent' ? '!' : ''}
              </div>
              {!checkout && (
                <div>
                  <button
                    onClick={updateItinerary}
                    disabled={added}
                    className={added ? `text-gray-100 bg-green-600` : ``}
                  >
                    {added ? 'Selected' : 'Select'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {modalOpen && (
        <HotelModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          hotel={hotel}
        />
      )}
    </>
  );
}
