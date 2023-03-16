import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { restoreUser } from '../../store/session';
import { initialSpots } from '../../store/spots';
import CreateSpotModal from '../CreateSpotModal';
import DeleteSpotModal from '../DeleteSpotModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import SpotCard from '../SpotCard';
import UpdateSpotModal from '../UpdateSpotModal/UpdateSpotModal';
import './ManageSpots.css'

export default function ManageSpots() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(restoreUser());
        dispatch(initialSpots());
    }, [dispatch]);
    const user = useSelector(state => state.session.user);
    const spots = useSelector(state => state.spots.allSpots);
    const userSpots = Object.values(spots).filter(ele => user.id === ele.ownerId);
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }

    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = e => {
            if (!ulRef.current.contains(e.target)) setShowMenu(false);
        }
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);
    const closeMenu = () => setShowMenu(false);
    console.log(spots)
    console.log('USER', user.id, 'SPOTS', Object.values(spots))
    return (
        <div className='manage-spots-div'>
            <h1 className='manage-spots-title'>Manage Spots</h1>
            <OpenModalMenuItem
                itemText={`Create a Spot`}
                onClick={openMenu}
                onItemClick={closeMenu}
                modalComponent={<CreateSpotModal />} />
        <hr></hr>
            <div className='manage-landing'>
            {/* does the user have any spots? */}
            {userSpots.length ? (
            userSpots.map((ele, i) => (
                ele.previewImage !== 'No preview available yet' || null ?
                (
            //container for each card iteration
            <div className='manage-cards' key={`carddiv${i}`}>

                <SpotCard spot={ele} key={`managecards${i}`} />

            <div className='button-field' key={`buttondiv${i}`}>

            <OpenModalMenuItem
            itemText={`Delete`}
            onClick={openMenu}
            onItemClick={closeMenu}
            modalComponent={<DeleteSpotModal spotId={ele.id}/>}
            key={`delete-button-${ele.id}`}
            />

            <OpenModalMenuItem
            itemText={`Update`}
            onClick={openMenu}
            onItemClick={closeMenu}
            modalComponent={<UpdateSpotModal spot={ele} />}
            key={`update-button-${ele.id}`}
            />

            </div>
            </div>
                ) : null
            ))
           ) : null }
            </div>
        </div>
    )
}
