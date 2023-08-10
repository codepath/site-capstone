import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress'
import '../index.css'
import HotelCard from './HotelCard'
import axios from 'axios'

export default function HotelsPage({ arrivalDate, departureDate, travelers, destination, destID, cost, setCost, itinerary, setItinerary, filterActivities, filterFlights }) {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
 
  async function searchHotels() {
    let hotelSearch = {
      order_by: 'review_score',
      adults_number: travelers.toString(),
      checkin_date: arrivalDate,
      checkout_date: departureDate,
      room_number: '1',
      dest_Id: destID
    };
    console.log(hotelSearch);
    console.log(localStorage.getItem("searchHotels"));
    if (hotelSearch.checkin_date.length == 0) {
      hotelSearch = {
          order_by: 'review_score',
          adults_number: localStorage.getItem("adults_number"),
          checkin_date: localStorage.getItem("checkin_date"),
          checkout_date: localStorage.getItem("checkout_date"),
          room_number: '1',
          dest_Id: localStorage.getItem("dest_id")
      } 
      console.log("set hotel search?", hotelSearch);
    } 
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 3200));
    const response = await axios.post('http://localhost:3002/api/hotels-search', hotelSearch);
    console.log("finsihed fetching search results")

    localStorage.setItem("checkin_date", hotelSearch.checkin_date);
    localStorage.setItem("checkout_date", hotelSearch.checkout_date);
    localStorage.setItem("dest_id", hotelSearch.dest_Id);
    localStorage.setItem("room_number", hotelSearch.room_number);
    localStorage.setItem("adults_number", hotelSearch.adults_number);

    console.log("loading response ", response)

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
                      disabled={itinerary.Hotel == null? true : false}
                      onClick={() => {
                        if (filterActivities) {
                          navigate('/activities');
                        } else if (filterFlights) {
                          navigate('/flights');
                        } else {
                          navigate('/booking');
                        }
                      }}
                      className={itinerary.Hotel == null ? `bg-gray-100 text-gray-400` : ``}
                    >
                      {itinerary.Hotel == null ? 'Select a hotel to continue' : 'Continue'}
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
