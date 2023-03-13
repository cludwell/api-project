// import spot from "../../../../backend/db/models/spot";
import './SpotCard.css'

export default function SpotCard({ spot }) {
    if (!spot.previewImage) return null
    return (
        <div className="spot-card">
            <img src={`${spot.previewImage}`} alt='preview' className="spot-image"/>
            <div className="top-line">
                <span className="city">{spot.city}, {spot.state}</span>
                <span className="rating"><i class="fa-solid fa-star"></i>{spot.avgRating}</span>
            </div>
            <p className='spot-card-text'>{spot.description.slice(0, 50)}</p>
            <p className='spot-card-text price'>${spot.price.toFixed(2)} night</p>
        </div>
    )
}
