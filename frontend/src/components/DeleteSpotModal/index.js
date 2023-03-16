import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom'
import { useModal } from '../../context/Modal';
import './DeleteSpotModal.css'
import { deleteSpotById, initialSpots } from '../../store/spots';
import { useEffect } from 'react';

export default function DeleteSpotModal({ spotId }) {

    const dispatch = useDispatch()
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(initialSpots)
    })
    const spots = useSelector(state => state.spots.allSpots)
    const handleDeletion = e=> {
        e.preventDefault();
        console.log('HANDLE DELETION', spotId)
        dispatch(deleteSpotById(spotId))
        .then(closeModal)
    }
    const handleGoBack = e => {
        e.preventDefault();
        console.log("BEFORE", spots)
        closeModal();
        console.log("AFTER", spots)

    }

    return (
        <div className='delete-modal'>
            <h1 className='delete-title'>Confirm Delete</h1>
            <hr></hr>
            <button className='green-button'
            onClick={handleDeletion}>Yes</button>
            <button className='grey-button'
            onClick={handleGoBack}>No (Keep Spot)
            </button>
        </div>
    )
}
