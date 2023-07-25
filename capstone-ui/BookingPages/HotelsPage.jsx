
import { useState, useEffect } from "react"
import '../index.css'
import axios from 'axios'

export default function HotelsPage({ arrivalDate, departureDate,
                                     travelers, destination, 
                                     destID
                                    }){
    const [searchResults, setSearchResults] = useState("")

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
        console.log(response);
    }

    useEffect(() => {
        const data = searchHotels()
        console.log(data)
    }, [])

    return (
        <div className="flex w-screen h-screen px-64">
            <div className="relative shadow-lg  py-4 px-8 bg-white bg-opacity-80 w-screen">
                <div className="border-b ">
                <div className="flex">
                    <h1 className="mr-2">Find hotels in </h1>
                    <h1 className="font-semibold text-blue-500"> {destination.toUpperCase()}</h1>
                </div>
                <div className="flex-auto">
                    <div className="text-2xl flex flex-col mt-3">
                        <div>{arrivalDate} — {departureDate}</div>
                        <div className="mb-3">{travelers} {travelers > 1 ? 'guests' : 'guest'}</div>
                    </div>
                </div>
                </div>
            <div className="grid-cols-2">

            </div>
            </div>
           


        </div>
    )                                
}
