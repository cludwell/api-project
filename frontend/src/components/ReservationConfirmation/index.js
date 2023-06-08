import { useDispatch, useSelector } from 'react-redux'
import './ReservationConfirmation.css'
import { useEffect, useState } from 'react'
import LoadingIcon from '../LoadingIcon'
import { useParams } from 'react-router-dom'
import { userBookingsRequest } from '../../store/bookings'

export default function ReservationConfirmation() {

    const dispatch = useDispatch()
    const { bookingId } = useParams()
    const [ hasLoaded, setHasLoaded ] = useState(false)

    useEffect(() => {
        const loadData = async () => {
            await dispatch(userBookingsRequest())
            return setHasLoaded(true)
        }
        loadData()
    }, [dispatch])

    const bookings = useSelector(state => state.bookings.userBookings.Bookings)
    const booking = bookings[0]
    if (!hasLoaded) return <LoadingIcon />

    return (

    <div className='your-reservation'>
    <div className='reservation-content'>
    <div className='reservation-left'>
    <h1 className='reservation-title'>Your reservation is confirmed</h1>
    <h3 className='reservation-title'>You're going to {booking.Spot.city}</h3>
    <img className='reservation-img' src={booking.SpotImages[0].url} alt='' />

    <div className='reservation-header'>
    <div className='reesrvation-header-left-side'>
    <div className='reservation-intro'>Cozy spot in the heart {booking.Spot.city}</div>
    <div className='reservation-grey-text'>Entire home/apt by {booking.Owner.firstName}</div>

    </div>

    <img src='https://i.imgur.com/mMEwXsu.png' alt='user-icon'  className='user-icon reservation-user-icon'/>
    </div>

    </div>

    <div className='reservation-right'>
        placeholder for now
    </div>
    </div>

    </div>
    )
}
