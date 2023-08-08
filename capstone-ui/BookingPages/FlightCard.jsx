import '../index.css';
import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';

function FlightsCard({ flight, itinerary, setItinerary }) {
  const [formattedDepartureOutbound, setFormattedDepartureOutbound] = useState("");
  const [formattedArrivalOutbound, setFormattedArrivalOutbound] = useState("");
  const [formattedDepartureInbound, setFormattedDepartureInbound] = useState("");
  const [formattedArrivalInbound, setFormattedArrivalInbound] = useState("");
  const [selected, setSelected] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelect = () => {
    onSelectFlight(flight);
  };
 //console.log("flights", itinerary)
  function updateItinerary() {
    if (selected) {
      // Remove flight from itinerary
      setItinerary((prevState) => ({
        ...prevState,
        flights: prevState.flights.filter((item) => item.departingAt !== flight.departingAt),
      }));
    } else {
      // Add flight to itinerary
      setItinerary((prevState) => ({
        ...prevState,
        flights: [...prevState.flights, flight],
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
  console.log("fli-slices", flight)
  return (
    <div className='p-5'>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className='h-[300px] w-[1350px] ml-[60px] border border-black-10 shadow-lg'>
          <div className='flex flex-row'>
            <div className='p-5 flex flex-col'>
              <div>
                <div className='flex flex-row mb-[120px]'>
                  <img
                    className='w-[70px] h-[70px]'
                    src={flight.slices[0].segments[0].carrier.logoUrl}
                    alt="Airline Logo"
                  />
                  <h1 className='ml-10 mt-4 text-4xl whitespace-nowrap'>
                    {formattedDepartureInbound}
                  </h1>
                  <div className='flex flex-col'>
                    <hr className="h-1 mt-[40px] w-[450px] my-8 bg-gray-200 border-0 dark:bg-black ml-[20px] mb-[10px]" />
                    <h1 className='text-3xl ml-[150px] text-blue-500'>
                      {flight.slices[0].segments[0].carrier.name}
                    </h1>
                  </div>
                  <h1 className='ml-10 mt-4 text-4xl whitespace-nowrap'>
                    {formattedDepartureOutbound}
                  </h1>
                </div>
                <div className='flex flex-row'>
                  <img
                    className='w-[70px] h-[70px] mt-[-20px]'
                    src={flight.slices[1].segments[0].carrier.logoUrl}
                    alt="Airline Logo"
                  />
                  <h1 className='ml-10 mt-4 text-4xl whitespace-nowrap mt-[-20px]'>
                    {formattedArrivalInbound}
                  </h1>
                  <div className='flex flex-col'>
                    <hr className="h-1 mt-[-1px] w-[450px] my-8 bg-gray-200 border-0 dark:bg-black ml-[20px] mb-[10px]" />
                    <h1 className='text-3xl ml-[150px]  text-blue-500'>
                      {flight.slices[1].segments[0].carrier.name}
                    </h1>
                  </div>
                  <h1 className='ml-10 mt-4 text-4xl whitespace-nowrap mt-[-20px]'>
                    {formattedArrivalOutbound}
                  </h1>
                </div>
              </div>
              <div>{/* Additional content */}</div>
            </div>
            <div className="inline-block h-[300px] min-h-[1em] w-0.5 self-stretch bg-black opacity-100 dark:opacity-50 ml-[100px]"></div>
            <div className='p-5'>
              <h1 className='text-4xl mt-10'>Total Price: </h1>
              <h1 className='text-4xl mt-8 text-green-500'>${flight.totalAmount}</h1>
              <h1 className='text-xl mt-3 text-gray-500'>Total price for all travelers</h1>
              <button
                className={`mt-4 mb-2 p-2 rounded ${
                  selected ? 'bg-blue-500 text-white' : 'bg-white border border-blue-500 text-blue-500'
                }`}
                onClick={handleSelect}
              >
                {selected ? 'Selected' : 'Select'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FlightsCard;
