

export default function ThingsToDo (){
    return (
        <div className="things-to-do-page">
            <div className="user-actions">
                <button className="cart-btn">
                    Cart
                </button>
                <button className="account-btn">
                    Account
                </button>
            </div>
            <div className="travel-info">
                <div className="destination">
                    <h4> Destination </h4>
                    <p>Destination Name</p>
                </div>
                <div className="dates">
                    <h4> Dates </h4>
                    <p>Day of week, month, day of month —
day of week, month, day of month</p>
                </div>
                <div className="dates">
                    <h4> Budget Remaining </h4>
                    <p>$0.00</p>
                </div>
            </div>
            <div className="search-actions">
                <div className="search-bar">
                    {/* what is being searched? */}
                    <input type = "text" placeholder="Search"/>
                    {/* value = {searchValue} onChange = {handleOnSearch} */}
                </div>
                <div className="category">
                   {/* how to do dropdown */}
                </div>
                <div className="filter-by-price">
                    {/* filter can also be dropdown */}
                </div>
            </div>
            <div className="cards">
                <ActivityCards/>

            </div>
        </div>

    )
}


function ActivityCards(){
    return (
       
    <div className="Card"> {/* */}
        <div className = "image-container">  {/* media */}
            <img className ="image" src = " https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.womansworld.com%2Fgallery%2Fanimals%2Fbunny-photos-172767&psig=AOvVaw0ojHX_1HCRlEWlVLLnkkx5&ust=1689716254807000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCOiejNvZloADFQAAAAAdAAAAABAF" alt = "Image of activity"/>
        </div>
        <div className = "info-container">  {/* card-info*/}
            <div className = "info">
                <p className = "name">activity name</p> 
                {/* {activity.name} */}
                <p className = "price ">$price</p>                  
            </div>
            <div className = "cart-btns">
                <div className="add-btn">
                    <button>
                        Add to Itinerary
                    </button>
                    
                </div >
            </div>
        </div>
    </div>

)}

export {ActivityCards}