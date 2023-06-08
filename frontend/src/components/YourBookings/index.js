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
        // dispatch(userBookingsRequest())
    }, [dispatch])
    const bookings = useSelector(state => state.bookings.userBookings.Bookings)
    if (!hasLoaded) return <LoadingIcon />

    return (
        <div className='your-bookings'>
            {bookings.length ? bookings.map((book, i) => (
            <div className='booking' key={`container${i}`}>
            <div className='booking-row'>
            <div className='booking-address' key={`address${i}`}>
            <div className='book-spot-name' key={`name${i}`}>{book.Spot.name} </div>
            <div className='book-street' key={`street${i}`}>{book.Spot.address} </div>
            <div className='book-city' key={`city${i}`}>{book.Spot.city} </div>
            <div className='book-state' key={`state${i}`}>{book.Spot.state}, {book.Spot.country} </div>
            </div>
            <BookingMap spot={book.Spot} key={`map${i}`}/>
            </div>
            <hr key={`hr${i}`}></hr>
            </div>
            )) : null}

        </div>
    )
}
