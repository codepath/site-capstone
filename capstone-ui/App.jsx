import { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Homepage from './Homepage'
import Navbar from './Navbar'
import Footer from './Footer'
import './index.css'

function App() {
    const [filterFlights, setFilterFlights] = useState(false)
    const [filterActivities, setFilterActivities] = useState(false)
    const [filterHotels, setFilterHotels] = useState(false)

    const [departureDate, setDepartureDate] = useState(null)
    const [arrivalDate, setArrivalDate] = useState(null)

    const [destination, setDestination] = useState(null)

    const [travelers, setTravelers] = useState(null)

    const [budget, setBudget] = useState(null)
    return ( 
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="flex flex-col items-center w-screen h-screen">
            <Navbar />
            <Homepage filterFlights={filterFlights} setFilterFlights={setFilterFlights}
                    filterActivities={filterActivities} setFilterActivities={setFilterActivities}
                    filterHotels={filterHotels} setFilterHotels={setFilterHotels}
                    departureDate={departureDate} setDepartureDate={setDepartureDate}
                    arrivalDate={arrivalDate} setArrivalDate={setArrivalDate}
                    destination={destination} setDestination={setDestination}
                    travelers={travelers} setTravelers={setTravelers}
                    budget={budget} setBudget={setBudget}
            />
            <Footer />
        </div>
    </LocalizationProvider>
  )
}

export default App
