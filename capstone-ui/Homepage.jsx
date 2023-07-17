import '../index.css'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useState } from 'react'

export default function Homepage({ filterFlights, setFilterFlights,
                                   filterActivities, setFilterActivities,
                                   filterHotels, setFilterHotels,
                                   departureDate, setDepartureDate,
                                   arrivalDate, setArrivalDate,
                                   destination, setDestination,
                                   budget, setBudget,
                                   travelers, setTravelers }) {

    async function handleSubmit(event) {
        event.preventDefault()

    }
    return (
        <div className="px-16">
            <div><h1>Website title</h1></div>
            {/* Input box wrapper */}
            <div className="flex-auto">
                {/* Input box buttons */}
                <div>
                    I want to search for... 
                </div>
                <div className="flex space-x-4">
                    <Chip 
                        label="Hotels"
                        onClick={() => setFilterHotels(!filterHotels)}
                        variant={filterHotels ? "filled" : "outlined"}
                        color={filterHotels ? "success" : "default"}
                    />
                    <Chip
                        label="Activities"
                        onClick={() => setFilterActivities(!filterActivities)}
                        variant={filterActivities ? "filled" : "outlined"}
                        color={filterActivities ? "success" : "default"}
                    />
                    <Chip
                        label="Flights"
                        onClick={() => setFilterFlights(!filterFlights)}
                        variant={filterFlights ? "filled" : "outlined"}
                        color={filterFlights ? "success" : "default"}
                        disabled
                    />
                </div>
                <div className="flex space-x-4 w-full border border-gray-300 rounded-md mt-4 shadow-md">
                    {(!filterHotels && !filterActivities && !filterFlights) && (
                        <div>Choose at least one search filter to begin.</div>
                    )}
                    {filterHotels && (
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
                                label="Number of travelers"
                                type="number"
                                value={travelers}
                                onChange={(e) => setTravelers(e.target.value)}
                            />
                            <TextField
                                id="outlined-number"
                                label="Budget (USD)"
                                type="number"
                                value={budget}
                                onChange={(e) => setBudget(e.target.value)}
                                InputProps={{
                                    required: true,
                                }}
                            />

                             <Button disabled={true}>Search</Button>
                            </form>
                        </div>
                    )}

                    
                    
                    
                </div>
            </div>
        </div>
    )
}
