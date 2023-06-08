import { useDispatch, useSelector } from 'react-redux'
import './ReservationConfirmation.css'
import { useEffect, useState } from 'react'
import LoadingIcon from '../LoadingIcon'
import { useHistory, useParams } from 'react-router-dom'
import { userBookingsRequest } from '../../store/bookings'

export default function ReservationConfirmation() {

    const dispatch = useDispatch()
    const { bookingId } = useParams()
    const [ hasLoaded, setHasLoaded ] = useState(false)
    const history = useHistory()

    useEffect(() => {
        const loadData = async () => {
            await dispatch(userBookingsRequest())
            return setHasLoaded(true)
        }
        loadData()
    }, [dispatch])

    const bookings = useSelector(state => state.bookings.userBookings.Bookings)
    const booking = bookings && bookings.length ? bookings[0] : null
    const startDate = booking ? new Date(booking.startDate) : null
    const endDate = booking ? new Date(booking.endDate) : null
    const onClick = e => {
        history.push('/bookings')
    }
    if (!hasLoaded) return <LoadingIcon />

    return (

    <div className='your-reservation'>
    <div className='reservation-content'>
    <div className='reservation-left'>
    <h2 className='reservation-title'>Your reservation is confirmed</h2>
    <h4 className='reservation-title'>You're going to {booking.Spot.city}!</h4>
    <img className='reservation-img' src={booking.SpotImages[0].url} alt='' />

    <div className='reservation-header'>
    <div className='reesrvation-header-left-side'>
    <div className='reservation-intro'>Cozy spot in the heart {booking.Spot.city}</div>
    <div className='reservation-grey-text'>Entire home/apt by {booking.Owner.firstName}</div>

    </div>

    <img src='https://i.imgur.com/mMEwXsu.png' alt='user-icon'  className='reservation-user-icon'/>
    </div>

    <hr></hr>

    <div className='reservation-checkin'>
    <div>
        <span className='checkin-deets'>{startDate.toString().split(' ')[0]},</span>
        <span className='checkout-deets'>{endDate.toString().split(' ')[0]}</span>
    </div>
    <div>
       <span className='checkin-deets'>{startDate.toString().slice(3, 15)}</span>
       <span className='checkout-deets'>{endDate.toString().slice(3, 15)}</span>
    </div>
    <div>
        <span className='checkin-deets'>Check-in time is 4pm-9pm</span>
        <span className='checkout-deets'>Check-out 11am</span>
    </div>
    </div>
    <div className='full-iternary' onClick={onClick}>View full iternary</div>

    </div>

    <div className='reservation-right'>
    <div className='reservation-subtitle'>Address</div>
    <div className='reservation-address'>{booking.Spot.address}, {booking.Spot.city}, {booking.Spot.state}, {booking.Spot.country}</div>
    <hr></hr>
    <div className='reservation-subtitle'>Guests</div>
    <div className='reservation-guests'>1</div>
    <hr></hr>
    <div className='reservation-subtitle'>Amount</div>
    <div className='reservation-cost'>${booking.cost.toFixed(2)}</div>
    <hr></hr>
    <div className='reservation-subtitle'>Reservation Code</div>
    <div className='reservation-code'>ACBDEFGH1234</div>
    <hr></hr>
    <div className='reservation-subtitle'>{booking.Owner.firstName} is your host</div>
    <div>Contact {booking.Owner.firstName} to coordinate arrival time and key exchange.</div>
    <hr></hr>
    <div className='reservation-subtitle'>Know what to expect</div>
    <div>Make sure to review the house rules and amenities.</div>
    <hr></hr>
    <div className='reservation-subtitle'>Customer Support</div>
    <div>Contact our support team 24/7 from anywhere in the world</div>
    </div>
    </div>

    </div>
    )
}
