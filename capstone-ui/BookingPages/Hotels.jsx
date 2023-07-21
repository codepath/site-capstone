import { hotels } from "./data"
import { useState } from "react"
// import { ActivityCards } from "./ThingsToDoCard"
const destination = "New York"
const budget = 1000
const startDate = "Tuesday, July 18"
const endDate = "Sunday, July 23"
export default function Hotels (){



    const [itinerary, setItinerary] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [ price, setPrice ] = useState(0);

     //creates new array for products that incldue search value in name

     const filterByPrice = price != 0
    ? hotels.filter((hotel) => hotel.price <= price )
    : hotels
    
    const hotelsDisplayed = searchValue
    ? hotels.filter((hotel) => hotel.name.toLowerCase().includes(searchValue.toLowerCase()))
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
          console.log("already added")
        }
        if (itinerary.some(item => item.category === 'hotel')) {
           console.log("already added hotel")
        }else{
            itinerary.push(item)
        }
          setItinerary(itinerary)
          console.log("Itinerary")
          console.log(itinerary)
          console.log(itinerary.length)
         
      }
    return (
        <div className="hotels-page">
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
                    <p>{startDate}-{endDate}</p>
                </div>
                <div className="dates">
                    <h1> Budget Remaining </h1>
                    <p>${budget}</p>
                </div>
            </div>
            <div className="search-actions">
                <div className="search-bar">
                    <input type = "text" placeholder="Search" value = {searchValue} onChange = {handleOnSearch}/>
                    
                </div>
            
                <div className="filter-by-price">

                     <label htmlFor="category">Choose a price range: {price}</label>
                     <input type="range" min="0" max="20000"  onInput={ handleInput } />
                  
                </div>
            </div>
            <div className="cards">
            {hotelsDisplayed.map((hotel) => (
              <HotelCards hotel = {hotel} key = {hotel.id} addToItinerary = {addToItinerary}/>
            ))}

            </div>
        </div>

    )
}


function HotelCards({hotel, addToItinerary}){
    

      const handleItinerary= () => {
        addToItinerary(hotel)
    }



    return (
       
    <div className="Card"> {/* */}
        <div className = "image-container">  {/* media */}
            <img className ="image" src = {hotel.image} alt = {hotel.alt}/>
        </div>
        <div className = "info-container">  {/* card-info*/}
            <div className = "info">
                <p className = "name">{hotel.name}</p> 
                <p className = "name">{hotel.location}</p>
        
                <p className = "price ">${hotel.price}</p>                  
            </div>
            <div className = "cart-btns">
                <div className="add-btn">
                    <button onClick={handleItinerary}>
                        Add to Itinerary
                    </button>
                </div >

            </div>
        </div>
    </div>

)}

export {HotelCards}