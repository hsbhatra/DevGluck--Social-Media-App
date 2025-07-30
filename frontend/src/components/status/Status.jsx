import React from 'react'
import StatusCard from './StatusCard';

export default function Status() {
  const images = [1,2,3,4,5,6,7,8,9,10];
  const[status, setStatus] = React.useState(false);

  const handleStatusLoad = () => {
    setStatus(true);
  }

  const handleStatusClose = () => {
    setStatus(false);
  }
  
  return (
    <>
      {!status&&<div className="flex gap-2.5 overflow-x-auto p-2 w-full sm:w-10/12 md:w-8/12 lg:w-6/12 m-auto">
          {images.map((image, idx)=>{
            return(<img
            key={idx}
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Profile"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-4 border-blue-500 shadow-sm object-cover hover:scale-105 transition-transform cursor-pointer"
            onClick={handleStatusLoad}/>)
          })}
      </div>}
      {status && <StatusCard handleClose={handleStatusClose}/>}
    </>
  )
}
