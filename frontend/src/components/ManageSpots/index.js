import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { restoreUser } from '../../store/session';
import './ManageSpots.css'

export default function ManageSpots() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(restoreUser());
        
    }, [dispatch])
    return (
        <div className='manage-spots-div'>
            <h1 className='manage-spots-title'>Manage Spots</h1>
        </div>
    )
}
