import { useEffect, useState } from 'react'
import Modal from '@mui/material/Modal'

export default function ActivityCards({activity, setItinerary=null, checkout=false, itinerary}){
    const [added, setAdded] = useState(false)
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    function updateItinerary() {
        const addActivity = (newActivity) => {
            if (setItinerary != null) {
            setItinerary((prevState) => {
              return { ...prevState, 'Activities': [...prevState.Activities, newActivity] }
            })
            }   
        }
        const removeActivity = (activityName) => {
            if (setItinerary != null) {
            setItinerary(prevState => ({
              ...prevState,
              'Activities': prevState.Activities.filter(activity => activity.name !== activityName)
            }))
            }
        }
        const activityExists = itinerary['Activities'].some(obj => obj.name === activity.name)
        if (activityExists) {
            removeActivity(activity.name)
            setAdded(false)
            console.log(itinerary)
        }
        else {
            addActivity(activity)
            setAdded(true)
            console.log(itinerary)
        }
        }
        let photoLinks = {}
        useEffect(() => {
            activity.photos.map((photo, index) => {
                const photoSrc = photo.prefix + '400x400' + photo.suffix
                photoLinks[index] = photoSrc
            })
            
        }, [])
///console.log(activity.photos)
    const [activityPhotoIndex, setActivityPhotoIndex] = useState(0)

    function increasePhotoIndex() {
    if (activityPhotoIndex + 1 < activity.photos.length) {
        setActivityPhotoIndex((prevIndex) => prevIndex + 1)
    }
    }

    function decreasePhotoIndex() {
        if (activityPhotoIndex - 1 >= 0) {
            setActivityPhotoIndex((prevIndex) => prevIndex - 1)
        }
        }
  return (
     
    <div className="flex flex-col rounded-md w-76 shadow-md border border-blue-500">
        {!checkout && (
            <Modal open={open} onClose={handleClose}>
                <div className="flex items-center justify-center h-screen flex-col">
                <div className="flex w-96 justify-end mb-2">
                    <button onClick={handleClose}><i className='bx bx-x'></i></button>
                </div>
                <div className="relative overflow-hidden w-96">
                    <img className="w-full object-cover h-56 rounded-t-md" src={activity.photos[activityPhotoIndex].prefix+'400x400' + activity.photos[activityPhotoIndex].suffix} />
                    <div className="flex justify-between">
                        <button onClick={decreasePhotoIndex} className="absolute flex bottom-4 left-4 bg-white bg-opacity-30 text-black px-1 py-1 rounded-full"><i className='bx bx-chevron-left bx-md'></i></button>
                        <button onClick={increasePhotoIndex} className="absolute flex bottom-4 right-4 bg-white bg-opacity-30 text-black px-1 py-1 rounded-full"><i className='bx bx-chevron-right bx-md'></i></button>
                    </div>
                </div>
                <div className="flex items-center justify-center bg-white border border-blue-500 rounded-b-md w-96">
                <div className={`p-3 overflow-show ${checkout ? 'bg-white' : ''} w-full`}>
                    <div className="flex">
                        <div className = "flex flex-col w-full">
                            <div className="font-bold text-2xl h-10 overflow-scroll">{activity.name}</div>
                            <div className="flex w-full overflow-scroll h-12">
                            {activity.categories.map((item) => <div className="border border-blue-800 px-2 rounded-md max-h-9 mx-1 font-bold text-blue-600 flex justify-center items-center text-xs overflow-scroll">{item.name}</div>)}
                            </div>
                            <div>{activity.location.address}</div>
                            <div>{activity.location.locality}, {activity.location.region}</div>
                            <div className="flex">
                            <div className="flex flex-col">
                                <div>Rating: {activity.rating}</div>
                            </div>
                            
                        </div>  
                        <div className="mt-4 mb-4">{activity.hasOwnProperty('description') ? activity.description : "No description provided."}</div>            
                        <div className="flex justify-between w-full">
                        <div>
                            <button className=""><a href={`${activity.website}`} target="_blank">Website</a></button>
                        </div>
                        <button onClick={updateItinerary} className={added ? `text-gray-100 bg-green-600 font-bold` : `font-bold bg-gray-200`}>
                            {!added ? 'Add' : 'Added'}
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                </div>
            </Modal>
        )}
      {!checkout && (
        <div className="overflow-hidden">  
            <img className="w-full object-cover h-56 rounded-t-md" src={activity.photos[0].prefix+'400x400' + activity.photos[0].suffix} />
        </div>
      )}
      <div className={`p-3 overflow-show ${checkout ? 'bg-white' : ''}`}>
          <div className="flex">
          <div className = "info">
              <div className="font-bold text-2xl h-10">{activity.name}</div>
              <div className="flex w-full overflow-scroll h-12">
                {activity.categories.map((item) => <div className="border border-blue-800 px-2 rounded-md max-h-9 mx-1 font-bold text-blue-600 flex justify-center items-center text-xs overflow-scroll">{item.name}</div>)}
              </div>
              <div>{activity.location.address}</div>
              <div>{activity.location.locality}, {activity.location.region}</div>
              <div className="flex">
                <div className="flex flex-col">
                    <div>Rating: {activity.rating}</div>
                </div>
                <div className="flex flex-col ml-2">
                    <div className="text-gray-500"></div>
                </div>
            </div>              
          </div>

          {checkout && (
            <div className='ml-5 w-72'>
                {activity.description}
            </div>
          )}
          </div>
          <div className="flex justify-between mt-2">
            <div className="flex items-end">
                <button onClick={handleOpen} className="mr-3">About</button>
                <button className=""><a href={`${activity.website}`} target="_blank">Website</a></button>
            </div>
            {!checkout && (
              <div className="ml-auto">
                  <button onClick={updateItinerary} className={added ? `text-gray-100 bg-green-600 font-bold` : `font-bold bg-gray-200`}>
                    {!added ? 'Add' : 'Added'}
                  </button>
              </div >
              )}
              <div className="like-btn">
              </div >
          </div>
      </div>
  </div>

)}
