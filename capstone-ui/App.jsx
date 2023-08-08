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

    return ( 
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
            <div className="font-sans">
                
                <Router>
                    <Navbar setAuthenticated={setAuthenticated} authenticated={authenticated}
                            setDepartureDate={setDepartureDate} setArrivalDate={setArrivalDate}  setUserId = {setUserId}/>
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
                            <Activities itinerary ={itinerary}
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
                            <Account/>} 
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
                            />} 

                        />
                          <Route path="/Flights" element={
                            <FlightsPage itinerary={itinerary} setItinerary={setItinerary} 
                                         destination={destination} arrivalDate={arrivalDate} 
                                         departureDate={departureDate} 
                                         travelers={travelers} departureIATA={departureIATA}
                                         arrivalIATA={arrivalIATA} cost={cost} userId = {userId}
                            />} 
                        />
                         <Route path="/favorites" element={
                            <Favorites/>} 
                        />
                         <Route path="/booking" element={
                            <Booking itinerary={itinerary}/>} 
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
