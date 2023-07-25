import { activities } from "./data"
import { useState } from "react"
import '../index.css'
import ActivityCards from "./ActivityCards"
const destination = "New York"


export default function Activities ({addToItinerary, departureDate, arrivalDate, destintion, travelers  }){
    const [searchValue, setSearchValue] = useState("")
 
    
    const activitiesDisplayed = searchValue
    ? activities.filter((activity) => activity.name.toLowerCase().includes(searchValue.toLowerCase()))
    : activities

    const filterByLocation = destination
    ? activities.filter((activity) => activity.location.toLowerCase().includes(destination.toLowerCase()))
    : activitiesDisplayed


 const handleOnSearch = (event) => {
    setSearchValue(event.target.value)
    console.log("searchValue")
    console.log(searchValue)
  }

    return (
        <div className=" flex flex-col w-screen h-screen">
            <div className="flex flex-row items-center pl-64 ">
                <div className="text-center ml-8 mt-8 mb-8">
                    <h1 className="text-2xl"> Destination </h1>
                    <p className="text-lg">{destination}</p>
                </div>
                <div className="text-center ml-8 mt-8 mb-8  ">
                    <h1 className="text-2xl"> Dates </h1>
                    <p className="text-lg">{departureDate}-{arrivalDate}</p>
                </div>
                <div className="search-bar ml-8 mt-8 mb-8 ">
                    <input type = "text" placeholder="Search" value = {searchValue} onChange = {handleOnSearch}/>
                </div>
            </div>
            <div className="grid grid-cols-3">
            {filterByLocation.map((activity) => (
              <ActivityCards activity = {activity} key = {activity.id} addToItinerary = {addToItinerary}/>
            ))}
            </div>
        </div>

    )
}




//export {ActivityCards}