import { useState, useEffect } from "react"
import axios from "axios"
import "../index.css"
import CircularProgress from '@mui/material/CircularProgress'
import ActivityCards from "./ActivityCards"
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
}) {
    const [searchValue, setSearchValue] = useState("")
    const [priceValue, setPriceValue] = useState(1)
    const [sortValue , setSortValue] = useState("relevance")
    const [activities, setActivities] = useState([]) // Initialize as an empty array
    const [loading, setLoading] = useState(false)
    
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
        <>
        <div className="flex flex-row items-center pl-64">
            <div className="text-center ml-8 mt-8 mb-8">
            <h1 className="text-2xl"> Destination </h1>
            <p className="text-lg">{destination}</p>
            </div>
            <div className="text-center ml-8 mt-8 mb-8">
            <h1 className="text-2xl"> Dates </h1>
            <p className="text-lg">
                {departureDate}-{arrivalDate}
            </p>
            </div>
            <div className="search-bar ml-8 mt-8 mb-8">
            <input type="text" placeholder="Search" value={searchValue} onChange={handleOnSearch} />
            </div>
            <div>
                <label htmlFor="price-range">Choose A Price Range:</label> 
                    <select name="price-range" id="price-range" value={priceValue} onChange={handlePriceSelect}> 
                        <option value= "1" >$</option> 
                        <option value= "2" >$$</option> 
                        <option value= "3" >$$$</option> 
                        <option value= "4" >$$$$</option> 
                    </select>
            </div>
            <div>
                <label htmlFor="sort">Sort By: </label> 
                    <select name="sort" id="sort" value={sortValue} onChange={handleSortSelect}> 
                        <option value= "relevance" > relevance </option> 
                        <option value= "rating" > rating </option> 
                        <option value= "distance" > distance</option> 
                    </select>
            </div>
        </div>
        <div className="grid grid-cols-3">
            {activities?.map((activity) => (
            <ActivityCards activity={activity} key={activity.id} addToItinerary={addToItinerary} />
            ))}
        </div>
        </>
        )}
        </div>
        
  );
}
