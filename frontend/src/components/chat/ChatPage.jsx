import React from 'react'
import Messages from './Messages';

export default function () {
    return (
        <div className='h-full w-full -mb-20 sm:mb-0'>
            {/* Negative margin on mobile to counteract Layout's pb-20 padding */}
            <Messages />
        </div>
    )
}
