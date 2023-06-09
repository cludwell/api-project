import { useEffect, useState } from 'react'
import './YourBookings.css'
import { useDispatch, useSelector } from 'react-redux'
import { userBookingsRequest } from '../../store/bookings'
import LoadingIcon from '../LoadingIcon'
import BookingMap from './BookingMap.js'
import { NavLink } from 'react-router-dom'
export default function YourBookings() {
    const dispatch = useDispatch()
    const [ hasLoaded, setHasLoaded ] = useState(false)
    useEffect(() => {
        const loadData = async () => {
            await dispatch(userBookingsRequest())
            return setHasLoaded(true)
        }
        loadData()
    }, [dispatch])
    const bookings = useSelector(state => state.bookings.userBookings.Bookings)
    if (!hasLoaded) return <LoadingIcon />

    return (
        <div className='your-bookings'>
        <div className='your-bookings-content'>
            <h3>Upcoming Reservations</h3>
            <hr></hr>
            {bookings.length ? bookings.map((book, i) => (
            <div className={i % 2 === 0 ?'booking' : 'grey-booking booking'} key={`container${i}`}>
            <div className='booking-row' key={`bookingrow${i}`}>
            <div className='booking-text' key={`bookingtext${i}`}>
            <div className='booking-times' key={`bookingtimes${i}`}>
            <div className='booking-checkin' key={`bookingcheckin${i}`}>
                <div className='booking-checkin-deets checkin-day' key={`bookingcheckindeets${i}`}>{new Date(book.startDate).toString().split(' ')[0]}</div>
                <div className='booking-checkin-deets checkin-month-day' key={`bookingcheckindeetsmonthday${i}`}>{new Date(book.startDate).toString().slice(3, 11)}</div>
                <div className='booking-checkin-deets checkin-year' key={`bookingcheckindeetsyear${i}`}>{new Date(book.startDate).toString().slice(11, 15)}</div>
            </div>
            <div className='booking-checkout' key={`bookingcheckout${i}`}>
                <div className='booking-checkout-deets checkout-day' key={`bookingcheckoutday${i}`}>{new Date(book.endDate).toString().split(' ')[0]}</div>
               <div className='booking-checkout-deets checkout-month-day' key={`bookingcheckoutdeetsmonth${i}`}>{new Date(book.endDate).toString().slice(3, 11)}</div>
               <div className='booking-checkout-deets checkout-year' key={`bookingcheckoutyear${i}`}>{new Date(book.endDate).toString().slice(11, 15)}</div>
            </div>

            </div>
            <div className='booking-address' key={`bookingaddress${i}`}>
            <div className='booking-spot-name' key={`bookingname${i}`}>{book.Spot.name}</div>
            <div key={`spotaddress${i}`}>{book.Spot.address} </div>
            <div key={`spotcitystate${i}`}>{book.Spot.city} {book.Spot.state}, {book.Spot.country} </div>
            </div>
            </div>
            <BookingMap spot={book.Spot} key={`map${i}`}/>


            </div>
            {/* <hr key={`hr${i}`}></hr> */}
            </div>
            )) : null}
        </div>
        </div>
    )
}
