import { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import ActivityCards from "./ActivityCards";
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
  const [searchValue, setSearchValue] = useState("");
  const [activities, setActivities] = useState([]); // Initialize as an empty array

  useEffect(() => {
    // Fetch activities data from the server
    axios
      .post("http://localhost:3002/api/places-search", {
        query: searchValue,
        min_price: "1",
        max_price: "4",
        near: destination,
        sort: "relevance",
      })
      .then((response) => {
        // Update the activities state with the fetched data
        setActivities(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [searchValue, destination]); // Add searchValue and destination to the dependencies array

  const handleOnSearch = (event) => {
    setSearchValue(event.target.value);
  };




// end 




  //const [activitiesDisplayed, setActivitiesDisplayed] = useState(activities);

 

  // const handleOnSearch = (event) => {
  //   setSearchValue(event.target.value);
//     const response = await axios.post("http://localhost:3002/api/places-search", {
//         query: searchValue,
//         min_price: "1",
//         max_price: "4",
//         near: destination,
//         sort: "relevance",
//   };
//}

//   const filterByName = searchValue
//     ? activities.filter((activity) => activity.location.toLowerCase().includes(searchValue.toLowerCase()))
//     : activities;




  return (
    <div className="flex flex-col w-screen h-screen">
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
      </div>
      <div className="grid grid-cols-3">
        {activities?.map((activity) => (
          <ActivityCards activity={activity} key={activity.id} addToItinerary={addToItinerary} />
        ))}
      </div>
    </div>
  );
}
