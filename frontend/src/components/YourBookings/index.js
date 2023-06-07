import { useEffect, useState } from 'react'
import './YourBookings'
import { useDispatch, useSelector } from 'react-redux'
import { userBookingsRequest } from '../../store/bookings'
import LoadingIcon from '../LoadingIcon'

export default function YourBookings() {
    const dispatch = useDispatch()
    const [ isLoaded, setIsLoaded ] = useState(false)
    useEffect(() => {
        const loadData = async () => {
            await dispatch(userBookingsRequest())
            setIsLoaded(true)
        }
        loadData()
    })
    const bookings = useSelector(state => state.bookings.Bookings)
    if (!isLoaded) return <LoadingIcon />

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
            </div>
            )) : null}

        </div>
    )
}
