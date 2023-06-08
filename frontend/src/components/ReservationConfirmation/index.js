import { useDispatch } from 'react-redux'
import './ReservationConfirmation.css'
import { useEffect, useState } from 'react'
import LoadingIcon from '../LoadingIcon'
import { useParams } from 'react-router-dom'

export default function ReservationConfirmation({ booking }) {

    const dispatch = useDispatch()
    const { bookingId } = useParams()
    const [ hasLoaded, setHasLoaded ] = useState(false)

    // useEffect(() => {
    //     const loadData = async () => {
    //         await dispatch()
    //     }
    // }, [dispatch])

    if (!booking) return <LoadingIcon />

    return (

    <div className='your-reservation'>

    <h2 className='reservation-title'>You're going to {}</h2>
    </div>
    )
}
