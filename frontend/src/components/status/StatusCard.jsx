import React from 'react'

export default function StatusCard({handleClose}) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden bg-gray-400 shadow z-50 flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Overlay header for user and close button */}
        <div className="absolute top-0 left-0 w-full flex items-center justify-between px-4 py-3 z-10">
          <div className="flex items-center space-x-3">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="user"
              className="w-10 h-10 rounded-full object-cover"
            />
            <h4 className="text-sm font-medium text-white drop-shadow">User_name</h4>
          </div>
          <img
            src="https://imgs.search.brave.com/1xVCrSiagBEqU8Jl_QJsk4xMXE3K3qaE4SKkg8iDZ3U/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMDAv/NjAzLzg2My9zbWFs/bC9yZXZ2LTA1Lmpw/Zw"
            alt="close"
            className="w-10 h-10 rounded-md border-0 object-cover shadow-lg transform hover:scale-105 cursor-pointer"
            onClick={handleClose}
          />
        </div>
        {/* Responsive image */}
        <img
          src="https://imgs.search.brave.com/8wmIN0r7_Mf0_hnMf39BjbN36qTtCScIvHMM3zBcb5E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTg1/Mjk2NTAyL3Bob3Rv/L3Byb2Zlc3Npb25h/bC12aWRlby1jYW1l/cmEuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPURfUkJvdkNH/bm04SGJTaWthY1Br/bjE0cDVsOHJ6ZDhO/ZVNxLWY3X2o4blE9"
          alt="Status"
          className="
            w-full h-[80vh] object-cover rounded-md shadow-lg
            sm:max-w-xs md:max-w-md lg:max-w-2xl xl:max-w-4xl
            mx-auto
          "
        />
      </div>
    </div>
  )
}