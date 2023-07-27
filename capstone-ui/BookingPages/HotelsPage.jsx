
import { useState, useEffect } from "react"
import '../index.css'
import HotelCard from './HotelCard'
import axios from 'axios'

export default function HotelsPage({ arrivalDate, departureDate,
                                     travelers, destination, 
                                     destID, cost, setCost
                                    }){
    const [searchResults, setSearchResults] = useState([])

    async function searchHotels() {
        const hotelSearch = {
            order_by: 'popularity',
            adults_number: travelers.toString(),
            checkin_date: arrivalDate,
            checkout_date: departureDate,
            room_number: '1',
            dest_Id: destID
        };
        await new Promise(resolve => setTimeout(resolve, 2000));
        const response = await axios.post('http://localhost:3002/api/hotels-search', hotelSearch);
        setSearchResults(response.data.results)
    }

    useEffect(() => {
        searchHotels()
    }, [])

    return (
        <>
        {searchResults === [] && (
            <div>
                <h1>Loading...</h1>
            </div>
        )}
        {searchResults !== [] && (
        <div className="flex w-screen h-screen px-56 overflow-visible bg-slate-900">
            <div className="relative shadow-lg  py-4 px-8 bg-white  w-screen">
                <div className="border-b flex">
                <div>
                <div className="flex">
                    <div className="mr-2 text-4xl">Hotels in </div>
                    <div className="font-semibold text-blue-500 text-4xl"> {destination.toUpperCase()}</div>
                </div>
                <div className="flex-auto">
                    <div className="text-2xl flex flex-col mt-3">
                        <div>{arrivalDate} to {departureDate}</div>
                        <div className="mb-3">{travelers} {travelers > 1 ? 'guests' : 'guest'}</div>
                    </div>
                </div>
                </div>
                <div className="ml-auto">
                <div className="text-2xl font-bold">Total trip cost: ${cost}</div>
                <div>Excluding taxes and fees.</div>
            </div>
            </div>
            
                
                
                
            {(searchResults !== []) && (
                <div className="grid grid-cols-3 gap-6 mt-3">
                    {searchResults.map((item, index) => {
                        return (
                            <HotelCard key={index} hotel={item}
                             />
                        )})}
                </div>
            )}
            
            </div>
        </div>
        )}
        </>
    )                                
}
