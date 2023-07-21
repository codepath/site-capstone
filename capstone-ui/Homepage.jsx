import './index.css'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import ImageCarousel from './ImageCarousel'


export default function Homepage({ filterFlights, setFilterFlights,
                                   filterActivities, setFilterActivities,
                                   filterHotels, setFilterHotels,
                                   departureDate, setDepartureDate,
                                   arrivalDate, setArrivalDate,
                                   destination, setDestination,
                                   budget, setBudget,
                                   travelers, setTravelers,
                                 }) {
    
    const [submit, setSubmit] = useState(false)

    useEffect(() => {
        if ((budget === null || budget === "") 
    || (travelers === null || travelers === "")
    || (arrivalDate === null || arrivalDate === "") 
    || (departureDate === null || departureDate === "") 
    || (destination === null || destination === "")) setSubmit(false)
    else setSubmit(true) 
    }, [budget, travelers, arrivalDate, departureDate, destination])

    async function handleSubmit(event) {
        event.preventDefault()

    }
    
    const homepage_america = {
        "Toronto, Canada":"./Assets/toronto.jpg",
        "New York City, United States":"./Assets/nyc.jpg",
        "Los Angeles, United States":"./Assets/losangeles.jpg",
        "Mexico City, Mexico":"./Assets/mexicocity.jpg"
    }
    return (
        <div className="relative">
            <div className="absolute z-[-1] left-0 right-0 overflow-hidden h-72">
                <img src="./Assets/homepage-banner.jpg" className="w-full h-full object-cover object-bottom"/>
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
                            sx={{'borderRadius':'4px', 'width':'63px',
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
                    <div className="flex space-x-4 w-full border border-blue-500 rounded-md mt-4 shadow-md">
                        {(!filterHotels && !filterActivities && !filterFlights) && (
                            <div className="p-4"><h2>Choose at least one search filter to begin.</h2></div>
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
                                    value={departureDate} 
                                    onChange={(newDate) => setDepartureDate(newDate)}
                                />
                                <DatePicker 
                                    label="Check-out date" 
                                    value={arrivalDate} 
                                    onChange={(newDate) => setArrivalDate(newDate)}
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
                                <TextField
                                    id="outlined-number"
                                    label="Budget (USD)"
                                    inputAd
                                    type="number"
                                    value={budget}
                                    onChange={(e) => {e.target.value > 50 ? setBudget(e.target.value) : setBudget(50)}}
                                    InputProps={{
                                        required: true,
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    }}
                                />
                                <Link to={submit ? "/activities" : ""}>
                                <Button disabled={!submit ? true : false} 
                                        sx={{'border': '1px solid', 
                                        'height' : '55px'}}>Search</Button>
                                </Link>
                                </form>
                            </div>
                        )} 
                    </div>
                    <div>
                        <div className='flex mt-4 text-2xl'>The ultimate trip planning tool.</div>
                        <div className='h-0.5 bg-blue-500 w-1/3 my-3'></div>
                        <div>    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <br/><br/>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                    </div>
                    <div className="text-2xl">Trending destinations</div>
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
                            <ImageCarousel images={homepage_america}/>
                        </div>
                        <div className="text-2xl">
                            Europe
                            <div className="text-2xl font-bold mb-2"></div>
                            <ImageCarousel images={homepage_america}/>
                        </div>
                    </div>
                    <div className='flex justify-between mt-4'>
                        <div className="text-2xl">
                            South America
                            <div className="text-2xl font-bold mb-2"></div>
                            <ImageCarousel images={homepage_america}/>
                        </div>
                        <div className="text-2xl">
                            Africa
                        <div className="text-2xl font-bold mb-2"></div>
                            <ImageCarousel images={homepage_america}/>
                        </div>
                        <div className="text-2xl">
                            Oceania
                            <div className="text-2xl font-bold mb-2"></div>
                            <ImageCarousel images={homepage_america}/>
                        </div>
                    </div>
                    <div>
                        <div className='flex mt-4 text-2xl'>Features</div>
                        <div className='h-0.5 bg-blue-500 w-1/3 my-3'></div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}
