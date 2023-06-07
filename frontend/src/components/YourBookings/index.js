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
    })
    const bookings = useSelector(state => state.bookings.Bookings)
    if (!hasLoaded) return <LoadingIcon />

    return (
        <div className='your-bookings'>
            {bookings && bookings.length ? bookings.map(book => (
            <div className='booking'>
            <div className='booking-address'>
            <div className='book-spot-name'>{book.Spot.name} </div>
            <div className='book-street'>{book.Spot.address} </div>
            <div className='book-city'>{book.Spot.city} </div>
            <div className='book-state'>{book.Spot.state}, {book.Spot.country} </div>
            </div>
            <BookingMap spot={book.Spot} />
            </div>
            )) : null}

        </div>
    )
}
