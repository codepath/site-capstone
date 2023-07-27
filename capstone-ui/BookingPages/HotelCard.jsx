import '../index.css'
import { useState, useEffect } from 'react'
import HotelModal from './HotelModal'

export default function HotelCard({ hotel, setModalOpen, modalOpen, itinerary, 
                                    setItinerary, cost, setCost }) {
    const [added, setAdded] = useState(false)
    function updateItinerary() {
        let newCost = cost
        if (itinerary.hasOwnProperty('Hotel')) {
            newCost = (newCost - itinerary.Hotel.priceBreakdown.grossPrice.value.toFixed(2) 
                       + hotel.priceBreakdown.grossPrice.value).toFixed(2)
        }
        else {
            newCost = (cost + hotel.priceBreakdown.grossPrice.value).toFixed(2)
        }
        setCost(newCost)
        const updateItinerary = () => {
            setItinerary((prevItinerary) => ({
              ...prevItinerary, 
              'Hotel': hotel, 
            }))
        }
        updateItinerary()
    }

    useEffect(() => {
        if (Object.keys(itinerary).length === 0) return
        if (itinerary.Hotel.name === hotel.name) setAdded(true)
        else setAdded(false)
    }, [itinerary])
    return (
        <>
        {!modalOpen && (
        <div className="cursor-pointer flex flex-col rounded-md w-76 shadow-md border border-blue-500">
            
            <div className="overflow-hidden">
                <img className="w-full object-cover h-56 rounded-md"src={hotel.photoMainUrl} />
            </div>
            <div className="p-3 overflow-show">
            <div className="font-bold text-2xl h-10 overflow-scroll">{hotel.name}</div>
            <div className="flex">
                <div className="flex flex-col">
                    <div className="font-bold">${hotel.priceBreakdown.grossPrice.value.toFixed(2)}</div>
                    <div>Rating: {hotel.reviewScore}</div>
                </div>
                <div className="flex flex-col ml-2">
                    <div className="text-gray-500">total price</div>
                    <div className="text-gray-500">{hotel.reviewCount} reviews</div>
                </div>
            </div>
            <div className="flex justify-between">
                <div className={hotel.reviewScoreWord == 'Good' ||
                                hotel.reviewScoreWord == 'Very Good' ||
                                hotel.reviewScoreWord == 'Excellent' ?
                                `font-bold text-green-600` : ""}>{hotel.reviewScoreWord}{hotel.reviewScoreWord == 'Excellent' ? '!' : ''}</div>
                
                <div><button onClick={updateItinerary} disabled={added ? true : false}
                      className={added ? `text-gray-100 bg-green-600` : ``}
                     >{!added ? 'Select' : 'Selected'}</button>
                </div>
                </div>
            </div>
            </div>
            )}
            {modalOpen && (
                <HotelModal modalOpen={modalOpen}
                            setModalOpen={setModalOpen}
                            hotel={hotel} />
            )}
        </>
    )
}