import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom'
import { useModal } from '../../context/Modal';
import './DeleteSpotModal.css'
import { deleteSpotById, initialSpots } from '../../store/spots';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function DeleteSpotModal({ spotId }) {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory();
    useEffect(() => {
        dispatch(initialSpots)
    })
    const spots = useSelector(state => state.spots.allSpots)

    const handleDeletion = async e => {
        e.preventDefault();
        console.log('HANDLE DELETION', spotId)
        await dispatch(deleteSpotById(spotId))
        console.log("AFTER", spots)
        closeModal()
       
    }
    const handleGoBack = e => {
        e.preventDefault();
        closeModal();
    }

    return (
        <div className='delete-modal'>
            <h1 className='delete-title'>Confirm Delete</h1>
            <h3>Are you sure you want to remove this spot?</h3>
            <hr></hr>
            <button className='green-button'
            onClick={handleDeletion}>Yes</button>
            <button className='grey-button'
            onClick={handleGoBack}>No (Keep Spot)
            </button>
        </div>
    )
}
