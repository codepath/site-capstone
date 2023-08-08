import './index.css'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import ImageCarousel from './ImageCarousel'
import axios from 'axios'
import toronto from "../public/assets/toronto.jpg"
import nyc from "../public/assets/nyc.jpg"
import la from "../public/assets/losangeles.jpg"
import mex from "../public/assets/mexicocity.jpg"
import bali from "../public/assets/bali.jpg"
import bk from "../public/assets/bangkok.jpg"
import seoul from "../public/assets/seoul.jpg"
import tokyo from "../public/assets/tokyo.jpg"
import paris from "../public/assets/paris.jpg"
import rome from "../public/assets/rome.jpg"
import bc from "../public/assets/barcelona.jpg"
import london from "../public/assets/london.jpg"
import rio from "../public/assets/rio.jpg"
import machu from "../public/assets/machupichu.jpg"
import aires from "../public/assets/buenosaires.jpg"
import cart from "../public/assets/cartagena.jpg"
import zan from "../public/assets/zanzibar.jpg"
import casa from "../public/assets/casablanca.jpg"
import cape from "../public/assets/capetown.jpg"
import giza from "../public/assets/giza.jpg"
import bora from "../public/assets/borabora.jpg"
import syd from "../public/assets/sydney.jpg"
import auck from "../public/assets/auckland.jpg"
import oahu from "../public/assets/oahu.jpg"
import banner from "../public/assets//homepage-banner.jpg"



export default function Homepage({ filterFlights, setFilterFlights,
                                   filterActivities, setFilterActivities,
                                   filterHotels, setFilterHotels,
                                   departureDate, setDepartureDate,
                                   arrivalDate, setArrivalDate,
                                   destination, setDestination,
                                   travelers, setTravelers, destID, setDestID,
                                   departureIATA, setDepartureIATA,
                                   arrivalIATA, setArrivalIATA
                                 }) {
    
    const [submit, setSubmit] = useState(false)
    const navigate = useNavigate()
    //const [activities, setActivities] = useState ({}) 

    const [validateArrival, setValidateArrival] = useState({})
    const [validateDeparture, setValidateDeparture] = useState({})
    const [validDates, setValidDates] = useState(null)

    function padZero(number) {
        return number.toString().padStart(2, "0")
      }

      async function handleSearch() {
        if (submit && validDates !== false && validDates !== null) {
            console.log("searching?")
            const response = await axios.post('https://nomadiafe.onrender.com/api/hotels-location', {
                location_name: destination,
            });
    
            setDestID(response.data);
            
            if (filterHotels) navigate('/hotels');
            else if (filterActivities) navigate('/activities');
            else navigate('/flights')
        }
    }

    useEffect(() => {
        if (validateArrival.arrive >= validateDeparture.depart) {
            setValidDates(false);
        } else {
            setValidDates(true);
        }
    }, [validateArrival, validateDeparture]);
    
    useEffect(() => {
        if ((travelers === null || travelers === "") ||
            (arrivalDate === null || arrivalDate === "") ||
            (departureDate === null || departureDate === "") ||
            (destination === null || destination === "") ||
             validateArrival.arrive >= validateDeparture.depart ||
             (filterFlights && (departureIATA.length < 3 || arrivalIATA.length < 3))) {
            setSubmit(false);
        }
        else {
            setSubmit(true);
        }
    }, [travelers, arrivalDate, departureDate, destination, validateArrival, 
        validateDeparture, destID, arrivalIATA, departureIATA, filterFlights,
        filterHotels, filterActivities]);
    
    
    const homepage_america = {
        "Toronto":`${toronto}`,
        "New York City":`${nyc}`,
        "Los Angeles":`${la}`,
        "Mexico City":`${mex}`
    }
    const homepage_asia = {
        "Bali":`${bali}`,
        "Bangkok":`${bk}`,
        "Seoul":`${seoul}`,
        "Tokyo":`${tokyo}`
    }

    const homepage_europe = {
        "Paris":`${paris}`,
        "Rome":`${rome}`,
        "Barcelona":`${bc}`,
        "London":`${london}`
    }

    const homepage_latin = {
        "Rio":`${rio}`,
        "Machu Pichu":`${machu}`,
        "Buenos Aires":`${aires}`,
        "Cartagena":`${cart}`
    }

    const homepage_africa = {
        "Zanzibar":`${zan}`,
        "Casablanca":`${casa}`,
        "Cape Town":`${cape}`,
        "Giza":`${giza}`,
    }

    const homepage_oceania = {
        "Bora Bora":`${bora}`,
        "Sydney":`${syd}`,
        "Auckland":`${auck}`,
        "Oahu":`${oahu}`
    }

    return (
        <div className="relative">
            <div className="absolute z-[-1] left-0 right-0 overflow-hidden h-72 shadow-md">
                <img src={banner} className="w-full h-full object-cover object-bottom"/>
            </div>
            <div>
            
            <div className="relative shadow-lg mx-56 py-4 px-8 bg-white bg-opacity-80">
                <div className="font-semibold"><h1>Nomadia</h1></div>
                {/* Input box wrapper */}
                <div className="flex-auto">
                    <div className="text-2xl"><h2>Book your next adventure.</h2></div>
                    {/* Input box buttons */}
                    <div className="mt-3">
                        I want to search for... 
                    </div>
                    <div className="flex space-x-4">
                        <Chip 
                            label="Hotels"
                            onClick={() => setFilterHotels(!filterHotels)}
                            variant={filterHotels ? "filled" : "outlined"}
                            color={filterHotels ? "success" : "default"}
                            sx={{'borderRadius':'4px', 'width':'65px',
                                 'fontFamily':'Cairo',
                                }}
                        />
                        <Chip
                            label="Activities"
                            onClick={() => setFilterActivities(!filterActivities)}
                            variant={filterActivities ? "filled" : "outlined"}
                            color={filterActivities ? "success" : "default"}
                            sx={{'borderRadius':'4px', 'width':'80px',
                                 'fontFamily':'Cairo'}}
                        />
                        <Chip
                            label="Flights"
                            onClick={() => setFilterFlights(!filterFlights)}
                            variant={filterFlights ? "filled" : "outlined"}
                            color={filterFlights ? "success" : "default"}
                            sx={{'borderRadius':'4px', 'width':'67px',
                                 'fontFamily':'Cairo'}}
                        />
                    </div>
                    <div className={`flex space-x-4 w-full mt-4 ${filterHotels || 
                                     filterActivities || filterFlights ? 
                                     `border bg-white border-blue-500 rounded-md shadow-md` 
                                     : `pl-0 font-semibold bg-transparent`}`
                                    }>
                        {(!filterHotels && !filterActivities && !filterFlights) && (
                            <div>
                                <h2>Choose at least one search filter to begin.</h2>
                            </div>
                        )}
                        {(filterHotels || filterActivities || filterFlights) && (
                            <div>
                                <form className="flex items-center justify-center space-x-4 p-4"
                                    onSubmit={handleSearch}
                                >
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Destination"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                />
                                <DatePicker 
                                    label="Check-in date"
                                    disablePast 
                                    value={arrivalDate} 
                                    onChange={(newDate) => {
                                        setValidateArrival({arrive: newDate["$d"]})
                                        const formattedDate = `${newDate["$y"]}-${padZero(newDate["$M"] + 1)}-${padZero(newDate["$D"])}`
                                        setArrivalDate(formattedDate)
                                    }}
                                    variant="standard"
                                />
                                <DatePicker 
                                    label="Check-out date" 
                                    disablePast
                                    value={departureDate} 
                                    onChange={(newDate) => {
                                        setValidateDeparture({depart: newDate["$d"]})
                                        const formattedDate = `${newDate["$y"]}-${padZero(newDate["$M"] + 1)}-${padZero(newDate["$D"])}`
                                        setDepartureDate(formattedDate)
                                    }}
                                    variant="standard"
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Travelers"
                                    type="number"
                                    value={travelers}
                                    onChange={(e) => {e.target.value > 0 && e.target.value <= 12 
                                                      ? setTravelers(e.target.value) 
                                                      : e.target.value > 12 ? 
                                                      setTravelers(12) 
                                                      : setTravelers(1)}}
                                />
                                {filterFlights && (
                                    <>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Origin IATA"
                                        value={departureIATA}
                                        onChange={(e) => {e.target.value.length <= 3 ?
                                                          setDepartureIATA(e.target.value.toUpperCase())
                                                          : ''}}
                                    />
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Arrival IATA"
                                        value={arrivalIATA}
                                        onChange={(e) => {e.target.value.length <= 3 ?
                                                         setArrivalIATA(e.target.value.toUpperCase())
                                                         : ''}}
                                    />
                                    </>
                                )}
                                <Button disabled={!submit ? true : false} 
                                        sx={{'border': '1px solid', 
                                        'height' : '55px'}}
                                        onClick={handleSearch}
                                >Search</Button>
                                </form>
                                {!validDates && (
                                    <div className="text-red-500 font-bold pl-4 pb-3">Check-out date must be after check-in date.</div>
                                )}
                            </div>
                        )} 
                    </div>
                    <div>
                        <div className='flex mt-4 text-2xl'>The ultimate trip planning tool.</div>
                        <div className='h-0.5 bg-blue-500 w-1/3 my-3'></div>
                        <div className="text-lg">An intuitive, one-stop solution for all your travel needs. Effortlessly find hotel accommodations, trip excursions, and flights to thousands of destinations worldwide.
                        </div>
                        <div className="mt-3 text-lg">
                            First, pick your destination, travel dates, and number of travelers. Nomadia will build your itinerary as you view hotels, flights, and activities.
                        </div>
                        <div className="mt-3 text-lg">
                            Log in to save your trips and book them later.
                        </div>
                    </div>
                    <div className="text-2xl mt-3">Popular destinations</div>
                    <div className='h-0.5 bg-blue-500 w-1/3 my-3'></div>
                    <div className='flex justify-between mt-4'>
                        <div className="text-2xl">
                            North America
                            <div className="text-2xl font-bold mb-2"></div>
                            <ImageCarousel images={homepage_america}/>
                        </div>
                        <div className="text-2xl">
                            Asia
                        <div className="text-2xl font-bold mb-2"></div>
                            <ImageCarousel images={homepage_asia}/>
                        </div>
                        <div className="text-2xl">
                            Europe
                            <div className="text-2xl font-bold mb-2"></div>
                            <ImageCarousel images={homepage_europe}/>
                        </div>
                    </div>
                    <div className='flex justify-between mt-4'>
                        <div className="text-2xl">
                            South America
                            <div className="text-2xl font-bold mb-2"></div>
                            <ImageCarousel images={homepage_latin}/>
                        </div>
                        <div className="text-2xl">
                            Africa
                        <div className="text-2xl font-bold mb-2"></div>
                            <ImageCarousel images={homepage_africa}/>
                        </div>
                        <div className="text-2xl">
                            Oceania
                            <div className="text-2xl font-bold mb-2"></div>
                            <ImageCarousel images={homepage_oceania}/>
                        </div>
                    </div>
                    <div className="text-2xl mt-3">Frequently asked questions</div>
                    <div className='h-0.5 bg-blue-500 w-1/3 my-3'></div>
                </div>
            </div>
            </div>
        </div>
    )
}
