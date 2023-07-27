import './index.css'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import ImageCarousel from './ImageCarousel'
import axios from 'axios'



export default function Homepage({ filterFlights, setFilterFlights,
                                   filterActivities, setFilterActivities,
                                   filterHotels, setFilterHotels,
                                   departureDate, setDepartureDate,
                                   arrivalDate, setArrivalDate,
                                   destination, setDestination,
                                   travelers, setTravelers, destID, setDestID, setActivities
                                 }) {
    
    const [submit, setSubmit] = useState(false)
    const navigate = useNavigate()
    //const [activities, setActivities] = useState ({}) 

    function padZero(number) {
        return number.toString().padStart(2, "0")
      }

    async function handleSubmit() {
        if (submit) {
            const id = await axios.post('http://localhost:3002/api/hotels-location', {
                location_name: destination,
            })
          
            
            console.log("DESTINATION")
            console.log(destination)
            
            setDestID(id)
            if (filterHotels) navigate('/hotels')
            else if (filterActivities) navigate('/activities')
            else navigate('/flights')
        }
    }

    useEffect(() => {
        console.log(departureDate)
    }, [departureDate])

        
    useEffect(() => {
        if (
            (travelers === null || travelers === "")
            || (arrivalDate === null || arrivalDate === "") 
            || (departureDate === null || departureDate === "") 
            || (destination === null || destination === "")) setSubmit(false)
        else setSubmit(true) 
    }, [travelers, arrivalDate, departureDate, destination])
    
    const homepage_america = {
        "Toronto":"./Assets/toronto.jpg",
        "New York City":"./Assets/nyc.jpg",
        "Los Angeles":"./Assets/losangeles.jpg",
        "Mexico City":"./Assets/mexicocity.jpg"
    }
    const homepage_asia = {
        "Bali":"./Assets/bali.jpg",
        "Bangkok":"./Assets/bangkok.jpg",
        "Seoul":"./Assets/Seoul.jpg",
        "Tokyo":"./Assets/Tokyo.jpg"
    }

    const homepage_europe = {
        "Paris":"./Assets/paris.jpg",
        "Rome":"./Assets/rome.jpg",
        "Barcelona":"./Assets/barcelona.jpg",
        "London":"./Assets/london.jpg"
    }

    const homepage_latin = {
        "Rio":"./Assets/rio.jpg",
        "Machu Pichu":"./Assets/machupichu.jpg",
        "Buenos Aires":"./Assets/buenosaires.jpg",
        "Cartagena":"./Assets/cartagena.jpg"
    }

    const homepage_africa = {
        "Zanzibar":"./Assets/zanzibar.jpg",
        "Casablanca":"./Assets/casablanca.jpg",
        "Cape Town":"./Assets/capetown.jpg",
        "Giza":"./Assets/giza.jpg",
    }

    const homepage_oceania = {
        "Bora Bora":"./Assets/borabora.jpg",
        "Sydney":"./Assets/sydney.jpg",
        "Auckland":"./Assets/auckland.jpg",
        "Oahu":"./Assets/oahu.jpg"
    }

    return (
        <div className="relative">
            <div className="absolute z-[-1] left-0 right-0 overflow-hidden h-72">
                <img src="./Assets/homepage-banner.jpg" className="w-full h-full object-cover object-bottom"/>
            </div>
            <div className="absolute z-[-2] bg-gray-100 bg-opacity-75 h-full w-full">ttttt</div>
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
                                 'fontFamily':'IBM Plex Sans',
                                }}
                        />
                        <Chip
                            label="Activities"
                            onClick={() => setFilterActivities(!filterActivities)}
                            variant={filterActivities ? "filled" : "outlined"}
                            color={filterActivities ? "success" : "default"}
                            sx={{'borderRadius':'4px', 'width':'80px',
                                 'fontFamily':'IBM Plex Sans'}}
                        />
                        <Chip
                            label="Flights"
                            onClick={() => setFilterFlights(!filterFlights)}
                            variant={filterFlights ? "filled" : "outlined"}
                            color={filterFlights ? "success" : "default"}
                            sx={{'borderRadius':'4px', 'width':'67px',
                                 'fontFamily':'IBM Plex Sans'}}
                            disabled
                        />
                    </div>
                    <div className={`flex space-x-4 w-full mt-4 ${filterHotels || filterActivities || filterFlights ? `border bg-white border-blue-500 rounded-md shadow-md` : `pl-0 font-semibold bg-transparent`}`}>
                        {(!filterHotels && !filterActivities && !filterFlights) && (
                            <div><h2>Choose at least one search filter to begin.</h2></div>
                        )}
                        {(filterHotels || filterActivities) && (
                            <div>
                                <form className="flex items-center justify-center space-x-4 p-4"
                                    onSubmit={handleSubmit}
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
                                    value={arrivalDate} 
                                    onChange={(newDate) => {
                                        const formattedDate = `${newDate["$y"]}-${padZero(newDate["$M"] + 1)}-${padZero(newDate["$D"])}`
                                        setArrivalDate(formattedDate)
                                    }}
                                    variant="standard"
                                />
                                <DatePicker 
                                    label="Check-out date" 
                                    value={departureDate} 
                                    onChange={(newDate) => {
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
                                    onChange={(e) => {e.target.value > 0 && e.target.value <= 12 ? setTravelers(e.target.value) : 
                                                      e.target.value > 12 ? setTravelers(12) : setTravelers(1)}}
                                />
                                <Button disabled={!submit ? true : false} 
                                        sx={{'border': '1px solid', 
                                        'height' : '55px'}}
                                        onClick={handleSubmit}
                                >Search</Button>
                                </form>
                            </div>
                        )} 
                    </div>
                    <div>
                        <div className='flex mt-4 text-2xl'>The ultimate trip planning tool.</div>
                        <div className='h-0.5 bg-blue-500 w-1/3 my-3'></div>
                        <div className="text-lg">An intuitive, one-stop solution for all your travel needs. Effortlessly book hotel accommodations and excursions and access real-time flight status updates for thousands of destinations worldwide.
                        </div>
                        <div className="mt-3 text-lg">
                            First, pick your destination, travel dates, and number of travelers. Nomadia will update in real time as you build your itineraries.
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
                </div>
            </div>
            </div>
        </div>
    )
}
