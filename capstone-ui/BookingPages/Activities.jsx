import { activities } from "./data"
import { useState } from "react"
import ActivityCards from "./ActivityCards"
// import { ActivityCards } from "./ThingsToDoCard"
const destination = "New York"
//const budget = 1000
const startDate = "Tuesday, July 18"
const endDate = "Sunday, July 23"
export default function Activities ({addToItinerary, itinerary}){



    // const [itinerary, setItinerary] = useState([])
    const [searchValue, setSearchValue] = useState("")
    //const [ price, setPrice ] = useState(0);

     //creates new array for products that incldue search value in name

    //  const filterByPrice = price != 0
    // ? activities.filter((activity) => activity.price <= price )
    // : activities
    
    const activitiesDisplayed = searchValue
    ? activities.filter((activity) => activity.name.toLowerCase().includes(searchValue.toLowerCase()))
    : activities


 const handleOnSearch = (event) => {
    setSearchValue(event.target.value)
    console.log("searchValue")
    console.log(searchValue)
  }

//   const handleInput = (event)=>{
//     setPrice( event.target.value );
//   }
  


    // const addToItinerary = (item)=>{
    //     if(itinerary.includes(item)){
    //       console.log("already liked")
    //     }else{
    //         itinerary.push(item)
    //     }
    //       setItinerary(itinerary)
    //       console.log("Itinerary")
    //       console.log(itinerary)
    //       console.log(itinerary.length)
         
    //   }
    return (
        <div className="things-to-do-page">
            {/* make these btns links */}
            {/* add to navbar */}
            <div className="user-actions">
            <button className="like-btn">
                    Likes
                </button>
                <button className="cart-btn">
                    Cart
                </button>
                <button className="account-btn">
                    Account
                </button>
            </div>
            <div className="flex flex-row">
                <div className="text-center">
                    <h1 className="text-2xl"> Destination </h1>
                    <p className="text-lg">{destination}</p>
                </div>
                <div className="text-center">
                    <h1 className="text-2xl"> Dates </h1>
                    {/* how would i pull a date out? */}
                    <p className="text-lg">{startDate}-{endDate}</p>
                </div>
                {/* <div className="dates">
                    <h1> Budget Remaining </h1>
                    <p>${budget}</p>
                </div> */}
                <div className="search-bar">
                    {/* what is being searched? */}
                    <input type = "text" placeholder="Search" value = {searchValue} onChange = {handleOnSearch}/>
                </div>
            </div>
       
                {/* <div className="filter-by-price">
                     <label htmlFor="category">Choose a price range: {price}</label>
                     <input type="range" min = "0" max = "1000" onInput={ handleInput } />
                  
                </div> */}
            <div className="grid grid-cols-3">
            {activitiesDisplayed.map((activity) => (
              <ActivityCards activity = {activity} key = {activity.id} addToItinerary = {addToItinerary}/>
            ))}

            </div>
        </div>

    )
}




//export {ActivityCards}