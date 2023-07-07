// import spot from "../../../../backend/db/models/spot";
import { NavLink } from 'react-router-dom'
import './SpotCard.css'
import CardCarousel from './CardCarousel'
import { useState } from 'react'

export default function SpotCard({ spot }) {
    const [ chosenImage, setChosenImage ] = useState(0)
    if (!spot.previewImage) return null

    return (
        <div className="spot-card">
        <div className='spot-tooltip'>
        <i className="fa-solid fa-ghost"></i>
            {spot.name}</div>
            <CardCarousel spot={spot} chosenImage={chosenImage} setChosenImage={setChosenImage} />
            {/* <img src={`${spot.previewImage}`} alt='preview' className="spot-image"/> */}
            <NavLink to={`/spotsfe/${spot.id}`} style={{"textDecoration": "none"}}>
            <div className="top-line">
                <span className="spot-card-city">{spot.city}, {spot.state}</span>
                <span className="spot-card-rating"><i className="fa-solid fa-star star"></i>{spot.avgRating}</span>
            </div>
            {/* <p className='spot-card-text'>{spot.description}</p> */}
            <span className='spot-card-text price'>${parseInt(spot.price).toFixed(2)}</span><span className='spot-card-text'> night</span>
        </NavLink>
        </div>
    )
}
