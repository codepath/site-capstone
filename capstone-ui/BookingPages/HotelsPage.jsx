import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../index.css';
import HotelCard from './HotelCard';
import axios from 'axios';

export default function HotelsPage({ arrivalDate, departureDate, travelers, destination, destID, cost, setCost, itinerary, setItinerary, filterActivities }) {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  async function searchHotels() {
    const hotelSearch = {
      order_by: 'review_score',
      adults_number: travelers.toString(),
      checkin_date: arrivalDate,
      checkout_date: departureDate,
      room_number: '1',
      dest_Id: destID
    };
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await axios.post('http://localhost:3002/api/hotels-search', hotelSearch);
    setSearchResults(response.data.results);
    setLoading(false);
  }

  useEffect(() => {
    searchHotels();
  }, []);

  return (
    <div className="w-screen h-screen">
      {loading && (
        <div>
          <div className="text-4xl px-56 mt-4 ml-5">Fetching hotels...  <CircularProgress /></div>
        </div>
      )}
      {!loading && (
        <div className="flex w-screen h-screen px-56 bg-slate-900">
          <div className="relative shadow-lg py-4 px-8 bg-white w-screen overflow-y-scroll">
            <div className="border-b flex">
              <div>
                <div className="flex">
                  <div className="mr-2 text-4xl">Hotels in </div>
                  <div className="font-semibold text-blue-500 text-4xl"> {destination.toUpperCase()}</div>
                </div>
                <div className="flex-auto">
                  <div className="text-2xl flex flex-col mt-3">
                    <div>{arrivalDate} to {departureDate}</div>
                    <div className="mb-3">{travelers} {travelers > 1 ? 'guests' : 'guest'}</div>
                  </div>
                </div>
              </div>
              <div className="ml-auto">
                <div className="text-2xl font-bold">Total trip cost: ${cost}</div>
                <div>
                  <div>Excluding taxes and fees.</div>
                  <div>
                    <button
                      disabled={Object.keys(itinerary).length === 0 ? true : false}
                      onClick={() => {
                        filterActivities
                          ? navigate('/activities')
                          : navigate('/booking');
                      }}
                      className={Object.keys(itinerary).length === 0 ? `bg-gray-100 text-gray-400` : ``}
                    >
                      {Object.keys(itinerary).length === 0 ? 'Select a hotel to continue' : 'Continue'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {(searchResults.length !== 0) && (
              <div className="grid grid-cols-3 gap-6 mt-3">
                {searchResults.map((item, index) => (
                  <HotelCard
                    key={index}
                    hotel={item}
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    itinerary={itinerary}
                    setItinerary={setItinerary}
                    cost={cost}
                    setCost={setCost}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
