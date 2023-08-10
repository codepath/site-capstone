import '../index.css';
import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';

function FlightsCard({ flight, itinerary, setItinerary, checkout, cost, setCost }) {
  const [formattedDepartureOutbound, setFormattedDepartureOutbound] = useState("");
  const [formattedArrivalOutbound, setFormattedArrivalOutbound] = useState("");
  const [formattedDepartureInbound, setFormattedDepartureInbound] = useState("");
  const [formattedArrivalInbound, setFormattedArrivalInbound] = useState("");
  const [selected, setSelected] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //console.log("The itienrary in flight card", itinerary);

  useEffect(() => {
    // Check if the selected flight is in the itinerary
    setSelected(itinerary.flight === flight);
  }, [itinerary, flight]);

  const handleSelectFlight = () => {
    // If the button is disabled, prevent further actions
    if (loading) {
      return;
    }
  
    // Toggle the selected state
    setSelected(!selected);
  
    // Update the itinerary with the selected flight or remove it
    const updatedItinerary = {
      ...itinerary,
      flight: selected ? [] : [flight], // Set to an array with either the selected flight or an empty array
    };
  
    // Calculate the total cost based on the selected flight in the updated itinerary
    const totalCost = selected ? 0 : parseFloat(flight.totalAmount);
  
    setCost(totalCost.toFixed(2)); // Update the cost state
  
    // Disable the button temporarily during the state update
    setLoading(true);
  
    setTimeout(() => {
      setItinerary(updatedItinerary);
      setLoading(false);
    }, 800); // Adjust the delay as needed
    console.log("the itinerary", itinerary);

  };
 //console.log("flights", itinerary)
  function updateItinerary() {
    if (selected) {
      // Remove flight from itinerary
      setItinerary((prevState) => ({
        ...prevState,
        flight: prevState.flight.filter((item) => item.departingAt !== flight.departingAt),
      }));
      console.log("??", itinerary);
    } else {
      // Add flight to itinerary
      setItinerary((prevState) => ({
        ...prevState,
        flight: {flight},
      }));
    }
    setSelected((prevSelected) => !prevSelected);
  }

  function convertToNormalTime(dateTimeString) {
    const dateObj = new Date(dateTimeString);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    const amPm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${amPm}`;
  }

  useEffect(() => {
    if (flight) {
      // Convert the outbound departure time to normal time format
      const formattedDepartureOut = convertToNormalTime(
        flight.slices[0].segments[0].departingAt
      );
      setFormattedDepartureOutbound(formattedDepartureOut);

      // Convert the outbound arrival time to normal time format
      const formattedArrivalOut = convertToNormalTime(
        flight.slices[0].segments[0].arrivingAt
      );
      setFormattedArrivalOutbound(formattedArrivalOut);

      // Convert the inbound departure time to normal time format
      const formattedDepartureIn = convertToNormalTime(
        flight.slices[1].segments[0].departingAt
      );
      setFormattedDepartureInbound(formattedDepartureIn);

      // Convert the inbound arrival time to normal time format
      const formattedArrivalIn = convertToNormalTime(
        flight.slices[1].segments[0].arrivingAt
      );
      setFormattedArrivalInbound(formattedArrivalIn);

      if (flight.slices.length === 0) {
        setLoading(true);
      } else {
        setLoading(false);
      }
    }
  }, [flight]);
  return (
    <div className='p-5'>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className='h-[300px] w-[995px] mr-[200px] border border-black-10 shadow-lg'>
          <div className='flex flex-row'>
            <div className='p-3 flex flex-col'>
              <div>
                <div className='flex flex-row mb-[120px] mr-2'>
                  <img
                    className='w-[50px] h-[50px] mr-[-20px] mt-3'
                    src={flight.slices[0].segments[0].carrier.logoUrl}
                    alt="Airline Logo"
                  />
                  <h1 className='ml-10 mt-4 text-4xl whitespace-nowrap'>
                    {formattedDepartureInbound} hi
                  </h1>
                  <div className='flex flex-col'>
                    <hr className="absolute h-1 mt-[40px] w-[400px] my-8 bg-gray-200 border-0 dark:bg-black ml-[10px] mb-[10px]" />
                    <h1 className='absolute text-3xl ml-[140px] mt-[50px] text-blue-500'>
                      {flight.slices[0].segments[0].carrier.name} ?
                    </h1>
                  </div>
                  <h1 className='absolute ml-[627px] mt-4 text-4xl whitespace-nowrap'>
                    {formattedDepartureOutbound} ho
                  </h1>
                </div>
                <div className='flex flex-row'>
                  <img
                    className='w-[50px] h-[50px] mt-[-20px] mr-5'
                    src={flight.slices[1].segments[0].carrier.logoUrl}
                    alt="Airline Logo"
                  />
                  <h1 className='mt-4 text-4xl whitespace-nowrap mt-[-20px]'>
                    {formattedArrivalInbound}
                  </h1>
                  <div className='flex flex-col'>
                    <hr className="h-1 mt-[-1px] w-[400px] my-8 bg-gray-200 border-0 dark:bg-black ml-[20px] mb-[10px]" />
                    <h1 className='text-3xl ml-[140px]  text-blue-500'>
                      {flight.slices[1].segments[0].carrier.name}
                    </h1>
                  </div>
                  <h1 className='ml-3 mt-4 text-4xl whitespace-nowrap mt-[-20px]'>
                    {formattedArrivalOutbound}
                  </h1>
                </div>
              </div>
              <div>{/* Additional content */}</div>
            </div>
            <div className='absolute h-[300px] min-h-[1em] w-0.5 self-stretch bg-black opacity-100 dark:opacity-50 left-[850px] mr-3'></div>
            <div className='absolute flex flex-col justify-center p-5 ml-[800px]'>
              {/* Total Price */}
              <h1 className='text-3xl mt-10'>Total Price: </h1>
              <h1 className='text-3xl mt-8 text-green-500'>${flight.totalAmount}</h1>
              <h1 className='text-xl mt-3 text-gray-500'>Total price for all travelers</h1>
              {/* Select button */}
              <div className="mt-4 mb-2">
              <button
              className={`p-2 rounded ${
                selected ? 'bg-green-600 text-gray-100' : ''
              }`}
              onClick={handleSelectFlight}
              disabled={loading}
            >
              {loading & selected ? 'Selected' : 'Select'}
            </button>

            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FlightsCard;
