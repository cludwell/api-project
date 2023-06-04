import './LoadingIcon.css'
import React from 'react'
import ghosts from '../../images/ghosts.gif'
export default function LoadingIcon() {

    return (
        <div className='loading-container'>
            <img src={ghosts} alt='Loading...' />
        </div>
    )
}
