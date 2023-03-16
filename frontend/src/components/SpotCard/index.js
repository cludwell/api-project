// import spot from "../../../../backend/db/models/spot";
import { NavLink } from 'react-router-dom'
import './SpotCard.css'

export default function SpotCard({ spot }) {
    if (!spot.previewImage) return null

    return (
        <NavLink to={`/spotsfe/${spot.id}`}
        //want link w/o underline of everything
        style={{"textDecoration": "none"}}
        spotId={spot.id}>
        <div className="spot-card">
        <div className='spot-tooltip'>
        <i className="fa-solid fa-ghost"></i>
            {spot.name}</div>
            <img src={`${spot.previewImage}`} alt='preview' className="spot-image"/>
            <div className="top-line">
                <span className="city">{spot.city}, {spot.state}</span>
                <span className="rating"><i className="fa-solid fa-star"></i>{spot.avgRating}</span>
            </div>
            <p className='spot-card-text'>{spot.description}</p>
            <p className='spot-card-text price'>${spot.price.toFixed(2)} night</p>
        </div>
        </NavLink>

    )
}
