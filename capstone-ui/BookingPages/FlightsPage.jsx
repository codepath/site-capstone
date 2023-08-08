import '../index.css';
import { useState, useEffect } from 'react';
import FlightCard from './FlightCard';
import { CircularProgress } from '@mui/material'
import axios from 'axios'


function FlightsPage({ setItinerary, itinerary, destination, arrivalDate, 
                       departureDate, travelers, cost,
                       departureIATA, arrivalIATA }) {

    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cabinClass, setCabinClass] = useState("economy");
    const [selectedFlight, setSelectedFlight] = useState(null);
    
    async function setFlight() {
        departureDate= departureDate;
        arrivalDate= arrivalDate;
        setCabinClass(cabinClass); 
        travelers = travelers;
      
        let flight = {
            "numTravelers": travelers.toString(),
            "origin": departureIATA,
            "destination": arrivalIATA,
            "departure_date": departureDate,
            "arrival_date": arrivalDate,
            "cabin_class": cabinClass
        } 

    if (flight.departure_date.length == 0) {
        flight = {
            "numTravelers": localStorage.getItem("numTravelers"),
            "origin": localStorage.getItem("origin"),
            "destination": localStorage.getItem("destination"),
            "departure_date": localStorage.getItem("departure_date"),
            "arrival_date": localStorage.getItem("arrival_date"),
            "cabin_class": localStorage.getItem("cabin_class")
        } 
        console.log("set flight?", flight);
    } 

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await axios.post('https://nomadiafe.onrender.com/api/flights', flight);
    localStorage.setItem("numTravelers", flight.numTravelers);
    localStorage.setItem("origin", flight.origin);
    localStorage.setItem("destination", flight.destination);
    localStorage.setItem("departure_date", flight.departure_date);
    localStorage.setItem("arrival_date", flight.arrival_date);
    localStorage.setItem("cabin_class", flight.cabin_class);

    setSearchResults(response.data);
    setLoading(false);
    }
    const handleSelectFlight = (flight) => {
        if (selectedFlight === flight) {
          // If the same flight is clicked again, deselect it
          setSelectedFlight(null);
        } else {
          // Otherwise, select the clicked flight
          setSelectedFlight(flight);
        }
    };
    const handleOnClick = (option) => {
        if (option == "Premium Economy" && cabinClass != "premium_economy") {
            setCabinClass("premium_economy");
        } else if (option == "Economy" && cabinClass != "economy") {
            setCabinClass("economy");
        } else if (option == "First" && cabinClass != "first") {
            setCabinClass("first");
        } else if (option == "Business" && cabinClass != "business") {
            setCabinClass("business");
        }
    };
    useEffect(() => {
        setFlight();
      }, [cabinClass]);
      return (
        <>
          {!loading && (
            <div className="flex flex-col w-screen h-screen">
              <div className="flex w-screen h-screen px-56 bg-slate-900">
                <div className="relative shadow-lg py-4 px-8 bg-white w-screen overflow-y-scroll">
                  <div className="flex border-b">
                    <div>
                      <div className="flex">
                        <div className="mr-2 text-4xl">Flights to</div>
                        <div className="font-semibold text-blue-500 text-4xl">{destination.toUpperCase()}</div>
                      </div>
                      <div className="flex-auto">
                        <div className="text-2xl flex flex-col mt-3">
                          <div>
                            {arrivalDate} to {departureDate}
                          </div>
                          <div className="mb-3">
                            {travelers} {travelers > 1 ? 'guests' : 'guest'}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-auto">
                      <div className="text-2xl font-bold">Total trip cost: ${cost}</div>
                      <div>
                        <div>Excluding taxes and fees.</div>
                        <div>
                          <button
                            disabled={itinerary['Activities'].length === 0}
                            onClick={() => {
                              navigate('/booking');
                            }}
                            className={
                              itinerary['Activities'].length === 0
                                ? 'bg-gray-100 text-gray-400'
                                : ''
                            }
                          >
                            {itinerary['Activities'].length === 0
                              ? 'Select a flight to continue'
                              : 'Continue'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative w-full lg:max-w-sm flex flex-row mr-[270px] mb-[120px]">
                    <h2 className="text-3xl mr-[10px] mt-[3px] font-semibold">
                      Cabin Class:
                    </h2>
                    <select
                      onChange={(e) => handleOnClick(e.target.value)}
                      className="w-[200px] p-1 text-black bg-white border-white-2 rounded-md shadow-xl outline-md appearance-none focus:border-indigo-600 mb-5 text-center text-2xl"
                    >
                      <option>Economy</option>
                      <option>First</option>
                      <option>Business</option>
                      <option>Premium Economy</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    {searchResults.map((item, index) => (
                      <FlightCard
                        key={index}
                        flight={item}
                        itinerary={itinerary}
                        setItinerary={setItinerary}
                        selectedFlight={selectedFlight}
                        onSelectFlight={handleSelectFlight}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {loading && (
            <div className="w-screen h-screen">
              <div className="text-4xl px-56 mt-4 ml-5">Fetching flights... <CircularProgress /> </div>
            </div>
          )}
        </>
      );}      
export default FlightsPage;
