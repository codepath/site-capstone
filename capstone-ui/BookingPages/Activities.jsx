import { activities } from "./data"
import { useState } from "react"
// import { ActivityCards } from "./ThingsToDoCard"
const destination = "New York"
const budget = 1000
const startDate = "Tuesday, July 18"
const endDate = "Sunday, July 23"
export default function Activities (){



    const [itinerary, setItinerary] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [ price, setPrice ] = useState(0);

     //creates new array for products that incldue search value in name

     const filterByPrice = price != 0
    ? activities.filter((activity) => activity.price <= price )
    : activities
    
    const activitiesDisplayed = searchValue
    ? activities.filter((activity) => activity.name.toLowerCase().includes(searchValue.toLowerCase()))
    : filterByPrice


 const handleOnSearch = (event) => {
    setSearchValue(event.target.value)
    console.log("searchValue")
    console.log(searchValue)
  }

  const handleInput = (event)=>{
    setPrice( event.target.value );
  }
  


    const addToItinerary = (item)=>{
        if(itinerary.includes(item)){
          console.log("already liked")
        }else{
            itinerary.push(item)
        }
          setItinerary(itinerary)
          console.log("Itinerary")
          console.log(itinerary)
          console.log(itinerary.length)
         
      }
    return (
        <div className="things-to-do-page">
            {/* make these btns links */}
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
            <div className="travel-info">
                <div className="destination">
                    <h1> Destination </h1>
                    <p>{destination}</p>
                </div>
                <div className="dates">
                    <h1> Dates </h1>
                    {/* how would i pull a date out? */}
                    <p>{startDate}-{endDate}</p>
                </div>
                <div className="dates">
                    <h1> Budget Remaining </h1>
                    <p>${budget}</p>
                </div>
            </div>
            <div className="search-actions">
                <div className="search-bar">
                    {/* what is being searched? */}
                    <input type = "text" placeholder="Search" value = {searchValue} onChange = {handleOnSearch}/>
                    
                </div>
                <div className="category">
                  <label htmlFor="category">Choose a category:</label>
                  <select name="category" id="category">
                    <option value="cat1">Category 1</option> 
                    <option value="cat2">Category 2</option> 
                    <option value="cat3">Category 3</option> 
                    <option value="cat4">Category 4</option> 
                  </select>
                </div>
                <div className="filter-by-price">
                     <label htmlFor="category">Choose a price range: {price}</label>
                     <input type="range" onInput={ handleInput } />
                  
                </div>
            </div>
            <div className="cards">
            {activitiesDisplayed.map((activity) => (
              <ActivityCards activity = {activity} key = {activity.id} addToItinerary = {addToItinerary}/>
            ))}

            </div>
        </div>

    )
}


function ActivityCards({activity, addToItinerary}){
    

      const handleItinerary= () => {
        addToItinerary(activity)
    }



    return (
       
    <div className="Card"> {/* */}
        <div className = "image-container">  {/* media */}
            <img className ="image" src = {activity.image} alt = {activity.alt}/>
        </div>
        <div className = "info-container">  {/* card-info*/}
            <div className = "info">
                <p className = "name">{activity.name}</p> 
                {/* {activity.name} */}
                <p className = "price ">${activity.price}</p>                  
            </div>
            <div className = "cart-btns">
                <div className="add-btn">
                    <button onClick={handleItinerary}>
                        Add to Itinerary
                    </button>
                </div >
                <div className="like-btn">
                </div >
            </div>
        </div>
    </div>

)}

export {ActivityCards}