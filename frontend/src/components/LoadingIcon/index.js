import './LoadingIcon.css'
import React from 'react'
import Lottie from 'react-lottie';
import spinningGhost from './SpinningGhost.json'

export default function LoadingIcon() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: spinningGhost,
    };
    return (
        <div className='loading-container'>
            <Lottie options={defaultOptions} id="loading-lottie" />
        </div>
    )
}
