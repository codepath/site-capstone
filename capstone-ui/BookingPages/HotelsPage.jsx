
import { useState, useEffect } from "react"
// import HotelsClass from '../../capstone-api/models/hotels'
import '../index.css'

export default function HotelsPage({ 
                                  arrivalDate, departureDate,
                                  travelers, destination, 
                                  }){
    const [searchResults, setSearchResults] = useState("")
   

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
