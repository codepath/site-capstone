import { useEffect, useState } from 'react'

export default function ActivityCards({activity, setItinerary=null, checkout=false, itinerary}){
    const [added, setAdded] = useState(false)
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
    
///console.log(activity.photos)


  return (
     
    <div className="flex flex-col rounded-md w-76 shadow-md border border-blue-500">
      {!checkout && (
        <div className="overflow-hidden">  
            <img className="w-full object-cover h-56 rounded-md" src = {activity.photos[0].prefix+'400x400' + activity.photos[0].suffix} alt = "photo of ${activity.name}" />
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
          <div className="flex justify-end">
            {!checkout && (
              <div>
                  <button onClick={updateItinerary} className={added ? `text-gray-100 bg-green-600` : ``}>
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
