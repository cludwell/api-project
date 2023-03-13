import { useDispatch, useSelector } from 'react-redux'
import { populateSingleSpot } from '../../store/singlespot';
import './SpotDetails.css'

export default function SpotDetails({ spot }) {
    const dispatch = useDispatch();
    dispatch(populateSingleSpot(spot.id))
    const singleSpot = useSelector(state => state.singleSpot)
    console.log('STATE IN COMPONENT', singleSpot)
    if (!singleSpot) return null;
    return (
        <div className='spot-details'>
            <h3 className='spot-name'>{singleSpot.name}</h3>
            <h4 className='spot-subtitle'>{singleSpot.city}, {singleSpot.state}, {singleSpot.country}</h4>

        </div>
    )
}

