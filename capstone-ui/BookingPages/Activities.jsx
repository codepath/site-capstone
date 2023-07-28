import { useState, useEffect } from "react"
import axios from "axios"
import "../index.css"
import CircularProgress from '@mui/material/CircularProgress'
import ActivityCards from "./ActivityCards"
import { useNavigate } from "react-router-dom"
import { acts } from "./data"; // Check the correct path for this import

// export default function Activities({ addToItinerary, departureDate, arrivalDate, destination, travelers, activities }) {
//   const [searchValue, setSearchValue] = useState("");

//Stuff added 

export default function Activities({
                                    addToItinerary,
                                    departureDate,
                                    arrivalDate,
                                    destination,
                                    travelers,
                                    itinerary,
                                    setItinerary,
                                    cost
}) {
    const [searchValue, setSearchValue] = useState("")
    const [priceValue, setPriceValue] = useState(1)
    const [sortValue , setSortValue] = useState("relevance")
    const [activities, setActivities] = useState([]) // Initialize as an empty array
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    useEffect(() => {
        // Fetch activities data from the server
        setLoading(true)
        axios
        .post("http://localhost:3002/api/places-search", {
            query: searchValue,
            min_price: "1",
            max_price: priceValue,
            near: destination,
            sort: sortValue,
        })
        .then((response) => {
            // Update the activities state with the fetched data
            setActivities(response.data.results)
            setLoading(false)
        })
        .catch((error) => {
            console.error(error)
        })
    }, [searchValue, priceValue, destination,sortValue]) // Add searchValue and destination to the dependencies array

    const handleOnSearch = (event) => {
        setSearchValue(event.target.value)
    }

    const handlePriceSelect = (event) =>{
        console.log("price is changed")
        setPriceValue(event.target.value)
    }

    const handleSortSelect = (event) => {
        console.log("sort is changed")
        setSortValue(event.target.value)
        console.log(sortValue)
    }
    
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
                      disabled={itinerary['Activities'].length === 0 === 0 ? true : false}
                      onClick={() => {
                        navigate('/booking');
                      }}
                      className={itinerary['Activities'].length === 0 ? `bg-gray-100 text-gray-400` : ``}
                    >
                      {itinerary['Activities'].length === 0 ? 'Select an activity to continue' : 'Continue'}
                    </button>
                  </div>
                </div>
            </div>
            </div>
            <div className="mt-8 mb-8 flex justify-between">
                <input type="text" placeholder="Search" value={searchValue} onChange={handleOnSearch} />
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
                            <option value= "relevance" > relevance </option> 
                            <option value= "rating" > rating </option> 
                            <option value= "distance" > distance</option> 
                        </select>
                </div>
            </div>
            </div>
        <div className="grid grid-cols-3 gap-6 mt-3">
            {activities?.map((activity) => (
                <ActivityCards activity={activity} key={activity.id} 
                               itinerary={itinerary}
                               setItinerary={setItinerary} />
            ))}
        </div>
        </div>
        </div>
        )}
        </div>
        
  );
}
