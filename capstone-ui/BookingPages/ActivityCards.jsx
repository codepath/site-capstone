export default function ActivityCards({activity, addToItinerary}){
    

    const handleItinerary= () => {
      addToItinerary(activity)
  }



  return (
     
  <div className="flex space-x-4"> {/* */}
      <div className = "h-48 w-full object-cover">  {/* media */}
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
