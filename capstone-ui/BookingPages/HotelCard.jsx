import '../index.css'
import { useState } from 'react'
import HotelModal from './HotelModal'

export default function HotelCard({ hotel }) {
    const [modalOpen, setModalOpen] = useState(false)
    console.log(hotel)
    return (
        <div onClick={() => {setModalOpen(true)}} className="cursor-pointer flex flex-col rounded-md w-76 shadow-md border border-blue-500">
            
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
            <div className={hotel.reviewScoreWord == 'Good' ||
                            hotel.reviewScoreWord == 'Very Good' ||
                            hotel.reviewScoreWord == 'Excellent' ?
                            `font-bold text-green-600` : ""}>{hotel.reviewScoreWord}{hotel.reviewScoreWord == 'Excellent' ? '!' : ''}</div>
            </div>
            {modalOpen && (
                <HotelModal />
            )}
        </div>
    )
}