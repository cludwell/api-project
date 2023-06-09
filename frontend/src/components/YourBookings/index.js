import { useEffect, useState } from 'react'
import './YourBookings.css'
import { useDispatch, useSelector } from 'react-redux'
import { userBookingsRequest } from '../../store/bookings'
import LoadingIcon from '../LoadingIcon'
import BookingMap from './BookingMap.js'
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
            {bookings.length ? bookings.map((book, i) => (
            <div className='booking' key={`container${i}`}>
            <div className='booking-row'>
            <div className='booking-address' key={`address${i}`}>
            <div className='book-spot-name' key={`name${i}`}>{book.Spot.name} {book.id}</div>
            <div className='book-street' key={`street${i}`}>{book.Spot.address} </div>
            <div className='book-city' key={`city${i}`}>{book.Spot.city} </div>
            <div className='book-state' key={`state${i}`}>{book.Spot.state}, {book.Spot.country} </div>
            <p></p>
            {/* <div className='reservation-checkin your-bookings'>
    <div>
        <span className='checkin-deets'>{new Date(book.startDate).toString().split(' ')[0]},</span>
        <span className='checkout-deets'>{new Date(book.endDate).toString().split(' ')[0]}</span>
    </div>
    <div>
       <span className='checkin-deets'>{new Date(book.startDate).toString().slice(3, 15)}</span>
       <span className='checkout-deets'>{new Date(book.endDate).toString().slice(3, 15)}</span>
    </div>
    <div>
        <span className='checkin-deets'>Check-in time is 4pm-9pm</span>
        <span className='checkout-deets'>Check-out 11am</span>
    </div>
    </div> */}
            </div>
            <BookingMap spot={book.Spot} key={`map${i}`}/>
            </div>
            <hr key={`hr${i}`}></hr>
            </div>
            )) : null}

        </div>
    )
}
