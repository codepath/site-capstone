import { useEffect, useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Homepage from './Homepage'
import Navbar from './Navbar'
import Footer from './Footer'
import Activities from './BookingPages/Activities';
import HotelsPage from './BookingPages/HotelsPage';
import './index.css'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import Account from './AccountInfo/Account'
import Itinerary from './AccountInfo/Itinerary'
import Favorites from './AccountInfo/Favorites'
import Booking from './AccountInfo/Booking'
import Checkout from './AccountInfo/Checkout'
import FlightsPage from './BookingPages/FlightsPage';
import axios from "axios"


const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: ['Cairo', 'sans-serif'].join(','),
        textTransform: 'none',
        fontSize: 16,
      },
    },
});

function App() {
    const [filterFlights, setFilterFlights] = useState(false)
    const [filterActivities, setFilterActivities] = useState(true)
    const [filterHotels, setFilterHotels] = useState(true)

    const [departureIATA, setDepartureIATA] = useState('')
    const [arrivalIATA, setArrivalIATA] = useState('')

    const [destID, setDestID] = useState("")

    const [departureDate, setDepartureDate] = useState("")
    const [arrivalDate, setArrivalDate] = useState("")

    const [destination, setDestination] = useState("")

    const [travelers, setTravelers] = useState(1)

    const [authenticated, setAuthenticated] = useState(false)

    const [itinerary, setItinerary] = useState({'Activities' : [],
                                                'Hotel' : null,
                                            'flight': null})
    const [activities, setActivities] = useState ({})

    const [cost, setCost] = useState(0.00)
    const [userId, setUserId] = useState(0)
    const [userData, setUserdata] = useState();
    const addToItinerary = (item)=>{

        
        if ( itinerary.includes(item) || itinerary.some(item => item.category === 'hotel')) {
           console.log("already added ")
        } else{
            // itinerary.push(item)
            setItinerary([...itinerary, item])
        }
         // setItinerary(itinerary)
          console.log("Itinerary")
          console.log(itinerary)
          console.log(itinerary.length)
    }

    
    async function fetchUserDataFromToken(token, userId) {
        console.log("???", token, userId);
        console.log("hereeee");
        
        try {
            // Make an API call to fetch user data using the token
            const response = await axios.get(`https://nomadiafe.onrender.com/api/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Return the user data if successful
            return response.data;
        } catch (error) {
            // Handle errors appropriately
            console.error('Error fetching user data:', error);
            throw error;
        }
    }
    useEffect(() => {
        const token = localStorage.getItem('token');
      
        if (token) {
          const userId = localStorage.getItem('userId');
          fetchUserData(token, userId);
        }
      }, []);

    const fetchUserData = async (token, userId) => {
        try {
          const user = await fetchUserDataFromToken(token, userId);
          setUserdata(user);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      

    return ( 
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
            <div className="font-sans">
                
                <Router>
                    <Navbar setAuthenticated={setAuthenticated} authenticated={authenticated}
                            setDepartureDate={setDepartureDate} setArrivalDate={setArrivalDate}  setUserId = {setUserId}
                            setItinerary = {setItinerary}
                            />
                    <Routes>
                        <Route path="/" element={
                            <Homepage filterFlights={filterFlights} setFilterFlights={setFilterFlights}
                                    filterActivities={filterActivities} setFilterActivities={setFilterActivities}
                                    filterHotels={filterHotels} setFilterHotels={setFilterHotels}
                                    departureDate={departureDate} setDepartureDate={setDepartureDate}
                                    arrivalDate={arrivalDate} setArrivalDate={setArrivalDate}
                                    destination={destination} setDestination={setDestination}
                                    travelers={travelers} setTravelers={setTravelers}
                                    destID={destID} setDestID={setDestID}
                                    setActivities = {setActivities}
                                    departureIATA={departureIATA} arrivalIATA={arrivalIATA}
                                    setDepartureIATA={setDepartureIATA} setArrivalIATA={setArrivalIATA}
                            />
                        } />
                        <Route path="/activities" element={
                            <Activities filterFlights={filterFlights} itinerary ={itinerary}
                                        setItinerary = {setItinerary}
                                        addToItinerary = {addToItinerary}
                                        travelers={travelers}
                                        departureDate={departureDate}
                                        arrivalDate={arrivalDate}
                                        cost={cost}
                                        destination={destination}
                                        activities = {activities}
                                        userId={userId} /> }/>
                        <Route path="/hotels" element={
                            <HotelsPage 
                            filterFlights={filterFlights} 
                                    travelers={travelers}
                                    departureDate={departureDate}
                                    arrivalDate={arrivalDate}
                                    destination={destination}
                                    destID={destID} setDestID={setDestID}
                                    cost={cost} setCost={setCost}
                                    itinerary={itinerary} setItinerary={setItinerary}
                                    filterActivities={filterActivities} />} 

                        />
                         <Route path="/account" element={
                            <Account  authenticated={authenticated}
                            setAuthenticated={setAuthenticated}
                            userData={userData}/>} 
                        />
                         <Route path="/Itineraries" element={
                            <Itinerary
                                    travelers={travelers}
                                    departureDate={departureDate}
                                    arrivalDate={arrivalDate}
                                    destination={destination}
                                    destID={destID} setDestID={setDestID}
                                    cost={cost} setCost={setCost}
                                    userId = {userId}
                                    itinerary = {itinerary}
                            />} 

                        />
                          <Route path="/Flights" element={
                            <FlightsPage itinerary={itinerary} setItinerary={setItinerary} 
                                         destination={destination} arrivalDate={arrivalDate} 
                                         departureDate={departureDate} 
                                         travelers={travelers} departureIATA={departureIATA}
                                         arrivalIATA={arrivalIATA} cost={cost} userId = {userId}
                                          setCost={setCost}
                            />} 
                        />
                         <Route path="/favorites" element={
                            <Favorites  authenticated={authenticated}/>} 
                        />
                         <Route path="/booking" element={
                            <Booking itinerary={itinerary}  authenticated={authenticated}/>} 
                        />
                         <Route path="/checkout" element={
                            <Checkout itinerary={itinerary} arrivalDate={arrivalDate} departureDate={departureDate} destination={destination}/>} 
                        />
                    </Routes>
                </Router>
                <Footer />
            </div>
        </ThemeProvider>
    </LocalizationProvider>
  )
}
export default App
