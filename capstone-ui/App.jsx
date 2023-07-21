import { useEffect, useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Homepage from './Homepage'
import Navbar from './Navbar'
import Footer from './Footer'
import Activities from './BookingPages/Activities'
import Hotels from './BookingPages/Hotels';
import './index.css'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"

const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: ['IBM Plex Sans', 'sans-serif'].join(','),
        textTransform: 'none',
        fontSize: 16,
      },
    },
});

function App() {
    const [filterFlights, setFilterFlights] = useState(false)
    const [filterActivities, setFilterActivities] = useState(false)
    const [filterHotels, setFilterHotels] = useState(false)

    const [departureDate, setDepartureDate] = useState(null)
    const [arrivalDate, setArrivalDate] = useState(null)

    const [destination, setDestination] = useState(null)

    const [travelers, setTravelers] = useState(null)

    const [budget, setBudget] = useState(null)

    const [authenticated, setAuthenticated] = useState(false)

    const [itinerary, setItinerary] = useState([])

   

  
    const addToItinerary = (item)=>{
        
        if ( itinerary.includes(item) || itinerary.some(item => item.category === 'hotel')) {
           console.log("already added ")
        }else{
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
                <Navbar />
                <Router>
                    <Routes>
                        <Route path="/" element={
                            <Homepage filterFlights={filterFlights} setFilterFlights={setFilterFlights}
                                    filterActivities={filterActivities} setFilterActivities={setFilterActivities}
                                    filterHotels={filterHotels} setFilterHotels={setFilterHotels}
                                    departureDate={departureDate} setDepartureDate={setDepartureDate}
                                    arrivalDate={arrivalDate} setArrivalDate={setArrivalDate}
                                    destination={destination} setDestination={setDestination}
                                    travelers={travelers} setTravelers={setTravelers}
                                    budget={budget} setBudget={setBudget}
                            />
                        } />
                        <Route path="/activities" element={
                            <Activities itinerary ={itinerary} setItinerary = {setItinerary} addToItinerary = {addToItinerary} />} 
                        />
                        <Route path="/hotels" element={
                            <Hotels itinerary ={itinerary} setItinerary = {setItinerary} addToItinerary = {addToItinerary} />} 
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