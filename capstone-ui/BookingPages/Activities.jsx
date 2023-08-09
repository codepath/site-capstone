import { useState, useEffect } from "react"
import axios from "axios"
import "../index.css"
import CircularProgress from '@mui/material/CircularProgress'
import ActivityCards from "./ActivityCards"
import { useNavigate } from "react-router-dom"
import { acts } from "./data"; // Check the correct path for this import

export default function Activities({
                                    addToItinerary,
                                    departureDate,
                                    arrivalDate,
                                    destination,
                                    travelers,
                                    itinerary,
                                    setItinerary,
                                    cost,
                                    userId, filterFlights
}) {
    const [searchValue, setSearchValue] = useState("")
    const [inputValue, setInputValue] = useState("")
    const [priceValue, setPriceValue] = useState(1)
    const [sortValue , setSortValue] = useState("relevance")
    const [activities, setActivities] = useState([]) // Initialize as an empty array
    const [loading, setLoading] = useState(false)
    // const [itinerariesSaved, setItinerariesSaved] = useState(0)
    // const [savedItinerary, setSavedItinerary] = useState({
    //     userId: 1,
    //     hotelData:{
    //         name: "",
    //         city:"",
    //         price:0,
    //         check_in:"",
    //         check_out:""
    //     },
    //     activities:[
    //         {
    //         name: "",
    //         city:"",
    //         price:0,
    //         check_in:"",
    //         check_out:""
    //      },
    // ],
    //     flightData:{
    //         origin: "new york",
    //         destination: "california",
    //         departing_at:"2023-09-02T00:46:00",
    //         arriving_at: "2023-09-02T01:56:00",
    //         carrier:{
    //             name:"carrierName"
    //         }


    // }
    // })
    const navigate = useNavigate();
    useEffect(() => {
        // Fetch activities data from the server
        setLoading(true)
        axios
        .post("https://nomadia.onrender.com/api/places-search", {
            query: searchValue,
            min_price: "1",
            max_price: priceValue,
            near: destination,
            sort: sortValue
        })
        .then((response) => {
            console.log(response.data.results)
            setActivities(response.data.results)
            setLoading(false)
        })
        .catch((error) => {
            console.error(error)
        })
    }, [priceValue, destination, sortValue, searchValue])

    const handlePriceSelect = (event) =>{
        event.preventDefault()
        setPriceValue(event.target.value)
    }
    const handleOnSearch = (event) => {
        event.preventDefault()
        console.log(inputValue)
        setSearchValue(inputValue)
    }  
    const handleSortSelect = (event) => {
        event.preventDefault()
        setSortValue(event.target.value)
    }
    // const handleOnSubmit = async (e) => {
    //     e.preventDefault();
    //    // if (itinerary['Activities'].length !== 0 && itinerary.Hotel !== null && itinerary.flight !== null){

        
    //     // Update the state using the setSavedItinerary function
    //     setSavedItinerary({
    //         hotelData: {
    //             name: itinerary.Hotel.name,
    //             city: itinerary.Hotel.wishlistName,
    //             price: itinerary.Hotel.priceBreakdown.grossPrice.value.toFixed(2),
    //             check_in: itinerary.Hotel.checkinDate,
    //             check_out: itinerary.Hotel.checkoutDate,
    //         },
    //         activities:itinerary.Activities.map(activity => ({ 
    //             //itinerary.Activities[0].name
    //             //itinerary.Activities[0].location.locality
    //                 name: activity.name,
    //                 city: activity.location.locality,
    //                 price: 0,
    //                 check_in: itinerary.Hotel.checkinDate,
    //                 check_out: itinerary.Hotel.checkoutDate,
    //             })),
            
    //         flightData: {
    //             origin: "new york",
    //             destination: "california",
    //             departing_at: "2023-09-02T00:46:00",
    //             arriving_at: "2023-09-02T01:56:00",
    //             carrier: {
    //                 name: "carrierName",
    //             },
    //         },
    //     });
    //     setItinerariesSaved(itinerariesSaved + 1)
       

    // };

    // useEffect(() => {
        
    //     const submitData = async () => {
    //         try {
        
    //             const response = await axios.post(
    //                 `http://localhost:3009/api/users/${userId}/itineraries`,
    //                 savedItinerary
    //             );

    //             console.log("successful", response.data.results);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };

    //     // Call the submitData function when itinerariesSaved changes
    //     submitData();
    // }, [itinerariesSaved]);

    

    
  return (
    <div className="flex flex-col w-screen h-screen">
        {loading && (
            <div>
                <div className="text-4xl px-56 mt-4 ml-5">Fetching activities...  <CircularProgress /></div>
            </div>
        )}
        {!loading && (
        <div className="flex w-screen h-screen px-56 bg-slate-900">
            <div className="relative shadow-lg py-4 px-8 bg-white w-screen overflow-y-scroll">
            <div className="flex border-b">
            <div>
                <div className="flex">
                    <div className="mr-2 text-4xl">Activities in </div>
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
                      disabled={itinerary['Activities'].length === 0 ? true : false}
                      onClick={() => {
                        filterFlights ? navigate('/flights') : navigate('/booking')
                      }}
                      className={itinerary['Activities'].length === 0 ? `bg-gray-100 text-gray-400` : ``}
                    >
                      {itinerary['Activities'].length === 0 ? 'Select an activity to continue' : 'Continue'}
                    </button>
        
                  </div>
                </div>
            </div>
            </div>
            <div className="mt-8 mb-8 flex justify-between h-10">
                <form onSubmit={handleOnSearch}>
                    <input className="h-10 rounded-md" type="text" placeholder="Search" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                    <button className="h-10 ml-3" onClick={handleOnSearch}><i className='bx bx-search' ></i></button>
                </form>
            <div className="flex">
            <div>
                <label htmlFor="price-range" className="mr-2">Price:</label> 
                    <select name="price-range" id="price-range" value={priceValue} onChange={handlePriceSelect}> 
                        <option value= "1" >$</option> 
                        <option value= "2" >$$</option> 
                        <option value= "3" >$$$</option> 
                        <option value= "4" >$$$$</option> 
                    </select>
            </div>
                <div className="ml-2">
                    <label htmlFor="sort" className="mr-2">Sort By: </label> 
                        <select name="sort" id="sort" value={sortValue} onChange={handleSortSelect}> 
                            <option className="px-3" value= "relevance" > Relevance </option> 
                            <option value= "rating" > Rating </option> 
                            <option value= "distance" > Distance</option> 
                        </select>
                </div>
            </div>
            </div>
        <div className="grid grid-cols-3 gap-6 mt-3">
        {
            activities.length === 0 ? "No results found." :
                activities.map((activity) => (
                    <ActivityCards
                    activity={activity}
                    key={activity.id}
                    itinerary={itinerary}
                    setItinerary={setItinerary}
                    />
            ))
        }
        </div>
    </div>
    </div>
    )}
    </div>   
  );
}
