import '../index.css';
import { useState, useEffect } from 'react';
import FlightCard from './FlightCard';
import airplane from '../../public/assets/airplane.jpg';
import flight from '../../public/assets/flight.png';

import clouds from '../../public/assets/clouds.jpg';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button, filledInputClasses, CircularProgress } from '@mui/material'
import axios from 'axios'




function FlightsPage({ setItinerary, itinerary, destination, arrivalDate, departureDate, travelers, dest_iata, origin_iata }) {

    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cabinClass, setCabinClass] = useState("economy");
    const [selectedFlight, setSelectedFlight] = useState(null);

    
    
    dest_iata = "ORD"; // Replace with actual destination IATA code
    origin_iata = "JFK"; 
    
    async function setFlight() {
        departureDate= "2023-09-02";
        arrivalDate= "2023-09-04";
        setCabinClass("economy"); 
        travelers = "2";
      
        let flight = {
            "numTravelers": travelers.toString(),
            "origin": origin_iata,
            "destination": dest_iata,
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
    const response = await axios.post('https://nomadiabe.onrender.com/api/flights', flight);
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
       
        console.log(option);

    };
    
    useEffect(() => {
        setFlight();
      }, [cabinClass]);
    //     let item = {
        
    //         "totalAmount": "290.71",
    //         "totalCurrency": "USD",
    //         "slices": [
    //             {
    //                 "segments": [
    //                     {
    //                         "origin": "John F. Kennedy International Airport",
    //                         "destination": "O'Hare International Airport",
    //                         "departingAt": "2023-09-02T00:46:00",
    //                         "arrivingAt": "2023-09-02T01:56:00",
    //                         "carrier": {
    //                             "name": "Duffel Airways",
    //                             "logoUrl": "https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/ZZ.svg",
    //                             "website": null
    //                         }
    //                     }
    //                 ]
    //             },
    //             {
    //                 "segments": [
    //                     {
    //                         "origin": "O'Hare International Airport",
    //                         "destination": "John F. Kennedy International Airport",
    //                         "departingAt": "2023-09-04T02:19:00",
    //                         "arrivingAt": "2023-09-04T05:29:00",
    //                         "carrier": {
    //                             "name": "Duffel Airways",
    //                             "logoUrl": "https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/ZZ.svg",
    //                             "website": null
    //                         }
    //                     }
    //                 ]
    //             }
    //         ]
        
    // }
    return (
        <div className='flex flex-col w-screen min-h-screen bg-gray-20'>
           
              <div className=" h-1/4">
                 <img src={airplane} className="w-[900px] h-[500px] ml-[330px] mt-[30px] rounded-full shadow-2xl border-black-5" alt="Airplane" />
                     <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
                         {/* <h1 className='mr-[500px] mb-20 font-medium text-black'>NEW YORK{destination}</h1> */}
                         <div className='flex flex-col mr-[340px] mb-10'>
                         <h1 className='text-black flex items-center'>
                             <span className='mr-5'>{origin_iata}</span>
                             <hr class="h-1 w-[70px] my-8 bg-gray-200 border-0 dark:bg-black"/>
                             <img src={flight} className='w-[50px] h-[50px]'/>
                             <hr class="h-1 w-[70px] my-8 bg-gray-200 border-0 dark:bg-black"/>
                              <span className='ml-5'>{dest_iata}</span>
                         </h1>
                         </div>
     
                         <div className="relative w-full lg:max-w-sm flex flex-row mr-[270px] mb-[120px]">
                         <h2 className='text-3xl mr-[10px] mt-[3px] font-semibold'>Cabin Class:</h2>
                         <select onChange={(e) => handleOnClick(e.target.value)} className="w-[200px] p-1 text-black bg-white border-white-2 rounded-md shadow-xl outline-md appearance-none focus:border-indigo-600 mb-5 text-center text-2xl">\
                             <option>Economy</option>
                             <option>First</option>
                             <option>Business</option>
                             <option>Premium Economy</option>
                         </select>
                     </div>
                       
                        
                     </div>
                     <h1 className='ml-[150px] mt-[50px]'>Flight Offers</h1>
                     <hr class="h-1 mt-[5px] w-[1350px] my-8 bg-gray-200 border-0 dark:bg-black ml-[80px] mb-[10px]"/>

                      { loading ? <h2 className='text-4x1'>Fetching Flights
                        <CircularProgress/>
                        </h2> : 
                        <div className='flex flex-col'>
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
                     }     
                    
     
                    
                 </div>
            
           
        </div>
    );
}

export default FlightsPage;
