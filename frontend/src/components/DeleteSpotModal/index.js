import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './DeleteSpotModal.css'
import { deleteSpotById, initialSpots } from '../../store/spots';
import { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';

export default function DeleteSpotModal({ spotId }) {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    // const history = useHistory();
    useEffect(() => {
        dispatch(initialSpots())
    })
    // const spots = useSelector(state => state.spots.allSpots)

    const handleDeletion = async e => {
        e.preventDefault();
        // console.log('HANDLE DELETION', spotId)
        await dispatch(deleteSpotById(spotId))
        .then(closeModal())
        .then(dispatch(initialSpots()))

    }
    const handleGoBack = e => {
        e.preventDefault();
        closeModal();
    }

    return (
        <div className='delete-modal'>
            <h2 className='delete-title'>Confirm Delete</h2>
            <h4>Are you sure you want to remove this spot?</h4>
            <hr></hr>
            <button className='green-button'
            onClick={handleDeletion}>Yes</button>
            <button className='grey-button'
            onClick={handleGoBack}>No (Keep Spot)
            </button>
        </div>
    )
}
