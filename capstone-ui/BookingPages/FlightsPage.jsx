import '../index.css';
import { useState, useEffect } from 'react';
import FlightCard from './FlightCard';
import { CircularProgress } from '@mui/material'
import axios from 'axios'


function FlightsPage({ setItinerary, itinerary, destination, arrivalDate, 
                       departureDate, travelers, cost,
                       departureIATA, arrivalIATA, userId }) {

    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cabinClass, setCabinClass] = useState("economy");
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [itinerariesSaved, setItinerariesSaved] = useState(0)
    const [savedItinerary, setSavedItinerary] = useState({
        userId: 1,
        hotelData:{
            name: "",
            city:"",
            price:0,
            check_in:"",
            check_out:""
        },
        activities:[
            {
            name: "",
            city:"",
            price:0,
            check_in:"",
            check_out:""
         },
    ],
    //should make these blank 
        flightData:{
            origin: departureIATA,
            destination: arrivalIATA,
            departing_at:"2023-09-02T00:46:00",
            arriving_at: "2023-09-02T01:56:00",
            carrier:{
                name:"carrierName"
            }


    }
    })
    
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
    const response = await axios.post('http://localhost:3009/api/flights', flight);
    localStorage.setItem("numTravelers", flight.numTravelers);
    localStorage.setItem("origin", flight.origin);
    localStorage.setItem("destination", flight.destination);
    localStorage.setItem("departure_date", flight.departure_date);
    localStorage.setItem("arrival_date", flight.arrival_date);
    localStorage.setItem("cabin_class", flight.cabin_class);

    setSearchResults(response.data);
    console.log("RES",searchResults)
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

//for save for later feature
      const handleOnSubmit = async (e) => {
        e.preventDefault();
       // if (itinerary['Activities'].length !== 0 && itinerary.Hotel !== null && itinerary.flight !== null){

        
        // Update the state using the setSavedItinerary function
        setSavedItinerary({
            hotelData: {
                name: itinerary.Hotel.name,
                city: itinerary.Hotel.wishlistName,
                price: itinerary.Hotel.priceBreakdown.grossPrice.value.toFixed(2),
                check_in: itinerary.Hotel.checkinDate,
                check_out: itinerary.Hotel.checkoutDate,
            },
            activities:itinerary.Activities.map(activity => ({ 
                //itinerary.Activities[0].name
                //itinerary.Activities[0].location.locality
                    name: activity.name,
                    city: activity.location.locality,
                    price: 0,
                    check_in: itinerary.Hotel.checkinDate,
                    check_out: itinerary.Hotel.checkoutDate,
                })),
            
                //origin and destination are flipped in res
            flightData: {
                origin: itinerary.flight.slices[0].segments[0].destination, //or  departureIATA
                destination: itinerary.flight.slices[0].segments[0].origin, // or arrivalIATA
                departing_at: itinerary.flight.slices[0].segments[0].departingAt,
                arriving_at:itinerary.flight.slices[0].segments[0].arrivingAt,
                carrier: {
                    name: itinerary.flight.slices[0].segments[0].carrier,
                },
            },
        });
        setItinerariesSaved(itinerariesSaved + 1)
       

    };

    useEffect(() => {
        
        const submitData = async () => {
            try {
        
                const response = await axios.post(
                    `http://localhost:3009/api/users/${userId}/itineraries`,
                    savedItinerary
                );

                console.log("successful", response.data.results);
            } catch (error) {
                console.error(error);
            }
        };

        // Call the submitData function when itinerariesSaved changes
        submitData();
    }, [itinerariesSaved]);
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
                          <button onClick = {handleOnSubmit}> Save For Later </button>
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
