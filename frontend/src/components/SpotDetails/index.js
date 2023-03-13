import './SpotDetails.css'

export default function SpotDetails({ spot }) {

    return (
        <div className='spot-details'>
            <h3 className='spot-name'>{spot.name}</h3>
            <h4 className='spot-subtitle'>{spot.city}, {spot.state}, {spot.country}</h4>
            
        </div>
    )
}
